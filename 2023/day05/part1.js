const almanac = require('./input')

const processAlmanac = () => {
    const sections = almanac.split('\n\n')

    return sections.reduce((data, section) => {
        if (section.startsWith('seeds:')) {
            const values = section.split(':')[1].trim()

            data['seeds'] = values.split(/\s+/).map(Number)
        } else {
            const [title, values] = section.split(':\n')

            const mapping = values.split('\n').map((line) => {
                const [destStart, srcStart, rangeLength] = line.split(/\s+/).map(Number)

                return [destStart, srcStart, rangeLength]
            })

            data['categories'] = {
                ...data['categories'],
                [title]: mapping
            }
        }

        return data
    }, {})
}

const convertNumber = (number, mapping) => {
    /*
        mapping is an array of arrays, where each sub-array is a mapping of the destination start,
        the source start, and the range length
        
        if the number falls into the range of the source start and the range length, then
        the number is converted to the destination start plus the difference between the number
    */
    for (const [destStart, srcStart, rangeLength] of mapping) {
        if (number >= srcStart && number < srcStart + rangeLength) {
            return destStart + (number - srcStart)
        }
    }

    // if the number doesn't fall into any of the ranges, then it's already in the destination category
    return number
}

const convertThroughCategories = (seed, categories) => {
    let currentNumber = seed

    for (const key in categories) {
        if (categories.hasOwnProperty(key)) {
            currentNumber = convertNumber(currentNumber, categories[key])
        }
    }

    return currentNumber
}

const findLowestLocationNumber = (data) => {
    const seeds = data['seeds']

    // set the lowest location to the highest possible number
    let lowestLocation = Number.MAX_SAFE_INTEGER

    seeds.forEach((seed) => {
        // convert the seed through each category
        const locationNumber = convertThroughCategories(seed, data['categories'])

        // if the location number is lower than the current lowest, then update the lowest
        if (locationNumber < lowestLocation) {
            lowestLocation = locationNumber
        }
    })

    return lowestLocation
}

const data = processAlmanac()
const result = findLowestLocationNumber(data)

console.log(result)

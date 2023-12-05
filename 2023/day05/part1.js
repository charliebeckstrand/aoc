const almanac = require('./input')

const processSeeds = (section) => {
    const seeds = section.split(':')[1].trim()

    return seeds.split(/\s+/).map(Number)
}

const processCategory = (section) => {
    const [title, values] = section.split(':\n')
    const mapping = values.split('\n').map((line) => line.split(/\s+/).map(Number))

    return { title, mapping }
}

const processAlmanac = () => {
    const sections = almanac.split('\n\n')

    const data = { seeds: [], categories: {} }

    sections.forEach((section) => {
        if (section.startsWith('seeds:')) {
            data.seeds = processSeeds(section)
        } else {
            const { title, mapping } = processCategory(section)

            data.categories[title] = mapping
        }
    })

    return data
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

    let lowestLocation = Number.MAX_SAFE_INTEGER

    seeds.forEach((seed) => {
        const locationNumber = convertThroughCategories(seed, data['categories'])

        if (locationNumber < lowestLocation) {
            lowestLocation = locationNumber
        }
    })

    return lowestLocation
}

const data = processAlmanac()
const result = findLowestLocationNumber(data)

console.log(result)

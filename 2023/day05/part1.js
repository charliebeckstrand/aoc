const processSeeds = (section) => {
    const seeds = section.split(':')[1].trim()

    return seeds.split(/\s+/).map(Number)
}

const processCategory = (section) => {
    const [title, values] = section.split(':\n')

    const mapping = values.split('\n').map((line) => {
        const [destStart, srcStart, rangeLength] = line.split(/\s+/).map(Number)

        return [destStart, srcStart, rangeLength]
    })

    return { title, mapping }
}

const processAlmanac = (almanac) => {
    const sections = almanac.split('\n\n')

    return sections.reduce((acc, section) => {
        if (section.startsWith('seeds:')) {
            acc.seeds = processSeeds(section)
        } else {
            const { title, mapping } = processCategory(section)

            acc.categories = acc.categories || {}
            acc.categories[title] = acc.categories[title] || []
            acc.categories[title] = mapping || []
        }

        return acc
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

const findLowestLocationNumber = (almanac) => {
    const seeds = almanac['seeds']

    let lowestLocation = Number.MAX_SAFE_INTEGER

    seeds.forEach((seed) => {
        const locationNumber = convertThroughCategories(seed, almanac['categories'])

        if (locationNumber < lowestLocation) {
            lowestLocation = locationNumber
        }
    })

    return lowestLocation
}

const input = require('./input')
const almanac = processAlmanac(input)
const result = findLowestLocationNumber(almanac)

console.log(result)

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

const processInput = (input) => {
    const sections = input.split('\n\n')

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
    for (const [destStart, srcStart, rangeLength] of mapping) {
        if (number >= srcStart && number < srcStart + rangeLength) {
            return destStart + (number - srcStart)
        }
    }

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
const almanac = processInput(input)
const result = findLowestLocationNumber(almanac)

console.log(result)

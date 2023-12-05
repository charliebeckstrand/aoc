const almanac = require('./input')

const processAlmanac = () => {
    const sections = almanac.split('\n\n')

    return sections.reduce((data, section) => {
        /*
            if the section starts with 'seeds:', then it's a list of seeds
            otherwise, it's a mapping of numbers
        */
        if (section.startsWith('seeds:')) {
            const values = section.split(':')[1].trim()

            data['seeds'] = values.split(/\s+/).map(Number)
        } else {
            const [title, values] = section.split(':\n')

            data[title.trim()] = values.split('\n').map((line) => line.trim().split(/\s+/).map(Number))
        }

        return data
    }, {})
}

const convertNumber = (number, mapping) => {
    /*
        mapping is an array of arrays, where each sub-array is a range of numbers
        the first element of the sub-array is the starting number of the range in the destination category
        the second element of the sub-array is the starting number of the range in the source category
        the third element of the sub-array is the length of the range
    */
    for (const [destStart, srcStart, rangeLength] of mapping) {
        if (number >= srcStart && number < srcStart + rangeLength) {
            return destStart + (number - srcStart)
        }
    }

    // if the number doesn't fall into any of the ranges, then it's already in the destination category
    return number
}

const convertThroughCategories = (seed, almanac) => {
    let currentNumber = seed

    // convert through each category in the almanac
    currentNumber = convertNumber(currentNumber, almanac['seed-to-soil map'])
    currentNumber = convertNumber(currentNumber, almanac['soil-to-fertilizer map'])
    currentNumber = convertNumber(currentNumber, almanac['fertilizer-to-water map'])
    currentNumber = convertNumber(currentNumber, almanac['water-to-light map'])
    currentNumber = convertNumber(currentNumber, almanac['light-to-temperature map'])
    currentNumber = convertNumber(currentNumber, almanac['temperature-to-humidity map'])
    currentNumber = convertNumber(currentNumber, almanac['humidity-to-location map'])

    // currentNumber is now the location number
    return currentNumber
}

const findLowestLocationNumber = (data) => {
    const seeds = data['seeds']

    let lowestLocation = Infinity // start with infinity so that the first location number is always lower

    seeds.forEach((seed) => {
        // convert the seed through each category
        const locationNumber = convertThroughCategories(seed, data)

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

const processSeedRanges = (section) => {
    const seeds = section.split(':')[1].trim().split(/\s+/).map(Number)

    return seeds.reduce((ranges, value, i) => {
        if (i % 2 === 0) {
            ranges.push([value, seeds[i + 1]])
        }

        return ranges
    }, [])
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
            acc.seedRanges = processSeedRanges(section)
        } else {
            const { title, mapping } = processCategory(section)

            acc.categories = acc.categories || {}
            acc.categories[title] = acc.categories[title] || []

            acc.categories[title] = mapping
        }

        return acc
    }, {})
}

const convertRange = (range, mapping) => {
    let [start, length] = range
    let convertedRanges = []

    /*
        loop through each mapping and check if the number falls into the source range
        if it does, then convert it to the destination range
        if it doesn't, then move on to the next mapping
    */
    mapping.forEach(([destStart, srcStart, rangeLength]) => {
        let srcEnd = srcStart + rangeLength

        if (start < srcEnd && start + length > srcStart) {
            // calculate the overlap between the two ranges
            let overlapStart = Math.max(start, srcStart)
            let overlapEnd = Math.min(start + length, srcEnd)
            let newStart = destStart + (overlapStart - srcStart)

            convertedRanges.push([newStart, overlapEnd - overlapStart])
        }
    })

    // if the range doesn't overlap with any of the ranges, then it's already in the destination category, so return it as-is
    return convertedRanges.length > 0 ? convertedRanges : [[start, length]]
}

const convertThroughCategories = (seedRange, categories) => {
    let currentRanges = [seedRange]

    for (const category in categories) {
        let newRanges = []

        currentRanges.forEach((range) => {
            convertRange(range, categories[category]).forEach((convertedRange) => {
                newRanges.push(convertedRange)
            })
        })

        currentRanges = newRanges
    }

    return currentRanges
}

const findLowestLocationNumber = (processedAlmanac) => {
    let lowestLocation = Number.MAX_SAFE_INTEGER

    processedAlmanac['seedRanges'].forEach((seedRange) => {
        const locationRanges = convertThroughCategories(seedRange, processedAlmanac['categories'])

        locationRanges.forEach(([start]) => {
            if (start < lowestLocation) {
                lowestLocation = start
            }
        })
    })

    return lowestLocation
}

const almanac = require('./input')
const processedAlmanac = processAlmanac(almanac)
const result = findLowestLocationNumber(processedAlmanac)

console.log(result)

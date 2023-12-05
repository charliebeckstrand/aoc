const almanac = require('./input')

const processAlmanac = () => {
    const sections = almanac.split('\n\n')

    return sections.reduce((data, section) => {
        if (section.startsWith('seeds:')) {
            const values = section.split(':')[1].trim().split(/\s+/).map(Number)

            data['seedRanges'] = []

            for (let i = 0; i < values.length; i += 2) {
                let start = values[i]
                let length = values[i + 1]

                data['seedRanges'].push([start, length])
            }
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

function convertRange(range, mapping) {
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

function convertThroughCategories(seedRange, categories) {
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

function findLowestLocationNumber(data) {
    let lowestLocation = Number.MAX_SAFE_INTEGER

    data['seedRanges'].forEach((seedRange) => {
        const locationRanges = convertThroughCategories(seedRange, data['categories'])

        locationRanges.forEach(([start]) => {
            if (start < lowestLocation) {
                lowestLocation = start
            }
        })
    })

    return lowestLocation
}

const data = processAlmanac()
const result = findLowestLocationNumber(data)

console.log(result)

const schematic = require('./input')

const sumGearRatios = (schematic) => {
    // Map the numbers in the schematic to their coordinates
    const mapNumbers = () => {
        const numbersMap = []

        for (let y = 0; y < schematic.length; y++) {
            let currentNumber = ''
            let numberStartX = 0 // Start coordinate of the number

            for (let x = 0; x < schematic[y].length; x++) {
                const char = schematic[y][x]
                if (char >= '0' && char <= '9') {
                    if (currentNumber.length === 0) {
                        numberStartX = x // Start of a new number
                    }
                    currentNumber += char
                } else {
                    if (currentNumber.length > 0) {
                        numbersMap.push({
                            number: parseInt(currentNumber),
                            startCoordinates: { x: numberStartX, y },
                            endCoordinates: { x: x - 1, y } // End coordinate of the number
                        })
                        currentNumber = ''
                    }
                }
            }

            // If the last character in the row is a number, add it to the map
            if (currentNumber.length > 0) {
                numbersMap.push({
                    number: parseInt(currentNumber),
                    startCoordinates: { x: numberStartX, y },
                    endCoordinates: { x: schematic[y].length - 1, y }
                })
            }
        }

        return numbersMap
    }

    // Map the gear symbols in the schematic to their coordinates
    const mapGearSymbols = () => {
        const gearSymbolsMap = []

        for (let y = 0; y < schematic.length; y++) {
            for (let x = 0; x < schematic[y].length; x++) {
                const char = schematic[y][x]
                if (char === '*') {
                    gearSymbolsMap.push({
                        coordinates: { x, y }
                    })
                }
            }
        }

        return gearSymbolsMap
    }

    // Find gears by checking if a gear symbol is adjacent to exactly two numbers
    const findGears = (numbersMap, gearSymbolsMap) => {
        const gears = []

        for (const gearSymbol of gearSymbolsMap) {
            let numbersAdjacent = []
            let product = 1

            for (const number of numbersMap) {
                const { startCoordinates, endCoordinates } = number
                const { x: gearSymbolX, y: gearSymbolY } = gearSymbol.coordinates

                // Check each point in the range from startCoordinates to endCoordinates to see if it is adjacent to the gear symbol
                for (let x = startCoordinates.x; x <= endCoordinates.x; x++) {
                    if (
                        (x === gearSymbolX && gearSymbolY === startCoordinates.y - 1) || // top
                        (x === gearSymbolX && gearSymbolY === startCoordinates.y + 1) || // bottom
                        (x === gearSymbolX - 1 && gearSymbolY === startCoordinates.y) || // left
                        (x === gearSymbolX + 1 && gearSymbolY === startCoordinates.y) || // right
                        (x === gearSymbolX - 1 && gearSymbolY === startCoordinates.y - 1) || // top left
                        (x === gearSymbolX + 1 && gearSymbolY === startCoordinates.y - 1) || // top right
                        (x === gearSymbolX - 1 && gearSymbolY === startCoordinates.y + 1) || // bottom left
                        (x === gearSymbolX + 1 && gearSymbolY === startCoordinates.y + 1) // bottom right
                    ) {
                        numbersAdjacent.push(number.number)
                        product *= number.number

                        break
                    }
                }
            }

            // If the gear symbol is adjacent to exactly two numbers, add it to the list of gears
            if (numbersAdjacent.length === 2) {
                gears.push({
                    coordinates: gearSymbol.coordinates,
                    numbers: numbersAdjacent,
                    product
                })
            }
        }

        return gears
    }

    // Sum the product of each adjacent gear symbol
    return findGears(mapNumbers(), mapGearSymbols()).reduce(
        (acc, multipliedNumber) => acc + multipliedNumber.product,
        0
    )
}

const result = sumGearRatios(schematic)

console.log(`result: ${result}`)

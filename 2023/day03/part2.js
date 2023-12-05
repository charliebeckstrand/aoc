const sumGearRatios = (schematic) => {
    const mapNumbers = () => {
        const numbersMap = []

        for (let y = 0; y < schematic.length; y++) {
            let currentNumber = ''
            let numberStartX = 0

            for (let x = 0; x < schematic[y].length; x++) {
                const char = schematic[y][x]

                if (char >= '0' && char <= '9') {
                    if (currentNumber.length === 0) {
                        numberStartX = x
                    }
                    currentNumber += char
                } else {
                    if (currentNumber.length > 0) {
                        numbersMap.push({
                            number: parseInt(currentNumber),
                            startCoordinates: { x: numberStartX, y },
                            endCoordinates: { x: x - 1, y }
                        })
                        currentNumber = ''
                    }
                }
            }

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

    const findGears = (numbersMap, gearSymbolsMap) => {
        const gears = []

        for (const gearSymbol of gearSymbolsMap) {
            let adjacentNumbers = []
            let product = 1

            for (const number of numbersMap) {
                const { startCoordinates, endCoordinates } = number
                const { x: gearSymbolX, y: gearSymbolY } = gearSymbol.coordinates

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
                        adjacentNumbers.push(number.number)
                        product *= number.number

                        break
                    }
                }
            }

            if (adjacentNumbers.length === 2) {
                gears.push({
                    numbers: adjacentNumbers,
                    product
                })
            }
        }

        return gears
    }

    const sum = findGears(mapNumbers(), mapGearSymbols()).reduce((acc, gear) => acc + gear.product, 0)

    return sum
}

const schematic = require('./input')
const result = sumGearRatios(schematic)

console.log(result)

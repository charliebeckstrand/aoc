const schematic = require('./input')

const sumPartNumbers = (schematic) => {
    const grid = schematic.map((row) => row.split(''))

    const isNumber = (cell) => !isNaN(parseInt(cell))

    const isSymbol = (cell) => cell !== '.' && isNaN(parseInt(cell))

    const isPartNumber = (number, row, colStart, grid, isSymbol) => {
        for (let i = 0; i < number.length; i++) {
            for (let dRow = -1; dRow <= 1; dRow++) {
                for (let dCol = -1; dCol <= 1; dCol++) {
                    if (dRow === 0 && dCol === 0) continue

                    const neighborRow = row + dRow
                    const neighborCol = colStart + i + dCol

                    if (
                        neighborRow >= 0 &&
                        neighborRow < grid.length &&
                        neighborCol >= 0 &&
                        neighborCol < grid[row].length
                    ) {
                        if (isSymbol(grid[neighborRow][neighborCol])) {
                            return true
                        }
                    }
                }
            }
        }

        return false
    }

    const sum = grid.reduce((acc, row, rowIndex) => {
        for (let col = 0; col < row.length; col++) {
            // skip the cell if it's a symbol or if the previous cell is a number
            if (isSymbol(row[col]) || (col > 0 && isNumber(row[col - 1]))) continue

            if (isNumber(row[col])) {
                let fullNumber = ''

                // if the cell is a number, keep going until the end of the number
                while (col < row.length && isNumber(row[col])) {
                    fullNumber += row[col++]
                }

                // if the number is a part number, add it to the sum
                if (isPartNumber(fullNumber, rowIndex, col - fullNumber.length, grid, isSymbol)) {
                    acc += parseInt(fullNumber, 10)
                }
            }
        }

        return acc
    }, 0)

    return sum
}

const result = sumPartNumbers(schematic)

console.log(result)

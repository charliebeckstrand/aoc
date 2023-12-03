const schematic = require('./input')

const sumPartNumbers = (schematic) => {
    // Convert the engine schematic to a 2D array
    const grid = schematic.map((row) => row.split(''))

    // Check if a cell is a number
    const isNumber = (cell) => !isNaN(parseInt(cell))

    // Check if a cell is a symbol
    const isSymbol = (cell) => cell !== '.' && isNaN(parseInt(cell))

    // Check if a number is a part number
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

    // Sum all part numbers
    const sum = grid.reduce((acc, row, rowIndex) => {
        for (let col = 0; col < row.length; col++) {
            // Skip if the cell is a symbol or if the cell is a number and the previous cell is a number
            if (isSymbol(row[col]) || (col > 0 && isNumber(row[col - 1]))) continue

            // If the cell is a number, add it to the total sum
            if (isNumber(row[col])) {
                let fullNumber = ''

                // If the cell is a number and the previous cell is a symbol, add the number to the total sum
                while (col < row.length && isNumber(row[col])) {
                    fullNumber += row[col++]
                }

                // If the number is a part number, add it to the total sum
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

console.log(`result: ${result}`)

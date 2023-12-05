function gridToArray(grid) {
    const rows = grid.split('\n')
    const result = []

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].split('')
        result.push(row)
    }

    return result
}

function vantagePoints(y, x) {
    let [up, down, left, right] = [0, 0, 0, 0]

    for (let i = y - 1; i >= 0; i--) {
        up++
        if (grid[i][x] >= grid[y][x]) {
            break
        }
    }

    for (let i = y + 1; i < grid.length; i++) {
        down++
        if (grid[i][x] >= grid[y][x]) {
            break
        }
    }

    for (let i = x - 1; i >= 0; i--) {
        left++
        if (grid[y][i] >= grid[y][x]) {
            break
        }
    }

    for (let i = x + 1; i < grid[y].length; i++) {
        right++
        if (grid[y][i] >= grid[y][x]) {
            break
        }
    }

    return [up, down, left, right]
}

function getHighestPoint(grid) {
    let result = 0

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const [up, down, left, right] = vantagePoints(y, x)

            const score = up * down * left * right

            result = Math.max(score, result)
        }
    }

    return result
}

const input = require('./input')
const grid = gridToArray(input)
const result = getHighestPoint(grid)

console.log(result)

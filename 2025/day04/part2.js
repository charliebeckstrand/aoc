import input from './input.js'

const grid = input.map((line) => [...line])

const DIRECTIONS = new Map([
	['N', [-1, 0]],
	['NE', [-1, 1]],
	['E', [0, 1]],
	['SE', [1, 1]],
	['S', [1, 0]],
	['SW', [1, -1]],
	['W', [0, -1]],
	['NW', [-1, -1]]
])

const cell = (row, col) => (row >= 0 && col >= 0 ? grid.at(row)?.at(col) ?? null : null)

const surrounding = (row, col, char) =>
	Array.from(DIRECTIONS.values()).filter(([dr, dc]) => cell(row + dr, col + dc) === char).length

const accessible = (row, col) => grid[row][col] === '@' && surrounding(row, col, '@') < 4

const prune = () => {
	let count = 0

	for (const [r, row] of grid.entries()) {
		for (const [c] of row.entries()) {
			if (accessible(r, c)) {
				grid[r][c] = 'x'

				count++
			}
		}
	}

	return count
}

let total = 0

for (let count; (count = prune()) > 0; total += count);

console.log(total)

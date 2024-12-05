import grid from './input.js'

// Split the grid into lines, rows, and columns
const lines = grid.trim().split('\n')
const rows = lines.length
const cols = lines[0].length

const findXmas = () => {
	const target = 'XMAS'

	// Define each direction as a pair of deltas (dx, dy)
	const directions = new Map([
		['Right', { dx: 0, dy: 1 }],
		['Down', { dx: 1, dy: 0 }],
		['Down-Right', { dx: 1, dy: 1 }],
		['Up', { dx: -1, dy: 0 }],
		['Left', { dx: 0, dy: -1 }],
		['Up-Left', { dx: -1, dy: -1 }],
		['Up-Right', { dx: -1, dy: 1 }],
		['Down-Left', { dx: 1, dy: -1 }]
	])

	// Iterate over each cell in the grid and check if the target is present in each direction and return the total number of occurrences.
	return Array.from({ length: rows * cols })
		.map((_, i) => {
			const row = Math.floor(i / cols)
			const col = i % cols

			/*
			 * Count the number of directions in which the target is present.
			 * 1. Use the target length to determine the number of steps in each direction
			 * 2. Filter out the directions where the target is not present and count the remaining directions
			 * 3. Return the total count
			 */
			return Array.from(directions.values())
				.map(({ dx, dy }) =>
					Array.from({ length: target.length }, (_, k) => {
						const newRow = row + dx * k
						const newCol = col + dy * k
						return (
							newRow >= 0 &&
							newRow < rows &&
							newCol >= 0 &&
							newCol < cols &&
							lines[newRow][newCol] === target[k]
						)
					}).every(Boolean)
				)
				.filter(Boolean).length
		})
		.reduce((a, b) => a + b, 0)
}

console.log(findXmas())

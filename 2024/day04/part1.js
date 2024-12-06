import grid from './input.js'

const lines = grid.trim().split('\n')
const rows = lines.length
const cols = lines[0].length

/*
	Find the number of valid 'XMAS' characters in all directions.
	- The grid is divided into rows and columns
	- The 'XMAS' characters are present in the grid
	- The 'XMAS' characters are present in all directions
	- Return the total count of 'XMAS' characters in all directions
*/

const findXmas = () => {
	const target = 'XMAS'

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

	return Array.from({ length: rows * cols })
		.map((_, i) => {
			const row = Math.floor(i / cols)
			const col = i % cols

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

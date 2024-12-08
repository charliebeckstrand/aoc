import grid from './input.js'

const lines = grid.trim().split('\n')
const [rows, cols] = [lines.length, lines[0].length]

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

const findXmas = () => {
	const target = 'XMAS'

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

import grid from './input.js'

const lines = grid.trim().split('\n')
const [rows, cols] = [lines.length, lines[0].length]

const isValid = (a, b) => (a === 'M' && b === 'S') || (a === 'S' && b === 'M')

const findXmas = () =>
	lines.slice(1, rows - 1).reduce((totalCount, line, i) => {
		const row = i + 1
		const lineCount = line
			.split('')
			.slice(1, cols - 1)
			.reduce((count, char, j) => {
				const col = j + 1

				if (char === 'A') {
					const [topLeft, bottomRight, topRight, bottomLeft] = [
						lines[row - 1][col - 1],
						lines[row + 1][col + 1],
						lines[row - 1][col + 1],
						lines[row + 1][col - 1]
					]

					return count + (isValid(topLeft, bottomRight) && isValid(topRight, bottomLeft) ? 1 : 0)
				}
				return count
			}, 0)

		return totalCount + lineCount
	}, 0)

console.log(findXmas())

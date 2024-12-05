import grid from './input.js'

// Split the grid into lines, rows, and columns
const lines = grid.trim().split('\n')
const rows = lines.length
const cols = lines[0].length

// Check if the two characters are valid
const isValid = (a, b) => (a === 'M' && b === 'S') || (a === 'S' && b === 'M')

/*
 * Find the number of valid 'A' characters surrounded by 'M' and 'S' diagonally.
 * 1. Split the line into characters
 * 2. Remove the first and last characters
 * 3. Iterate over each character and check if it is 'A'
 * 4. Get the four diagonal characters
 * 5. Check if the diagonal characters are valid
 * 6. Return the total count
 */
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

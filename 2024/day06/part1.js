import grid from './input.js'

const map = grid.split('\n').map((row) => row.split(''))

const directions = new Map([
	['up', [-1, 0]],
	['right', [0, 1]],
	['down', [1, 0]],
	['left', [0, -1]]
])

/*
 * Find the position of the guard on the map.
 * Return the row and column index of the guard.
 */
const findGuardPosition = (map) => {
	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		const colIndex = map[rowIndex].indexOf('^')

		if (colIndex !== -1) {
			return { row: rowIndex, col: colIndex }
		}
	}

	return null
}

/*
 * Predict the path of the guard based on the current direction.
 * Return the number of unique positions visited by the guard.
 * The guard moves in the following way:
 * 1. If the guard hits a wall, change the direction
 * 2. If the guard can move forward, update the position
 * 3. If the guard has visited a space before, stop
 */
const predictPath = () => {
	const visited = new Set()

	// Initialize the guard with the starting direction and position
	const guard = {
		direction: 'up',
		position: { row: 0, col: 0 }
	}

	// Find the starting position of the guard
	const guardPosition = findGuardPosition(map)

	// If the guard is found, update the guard's position and the map
	if (guardPosition) {
		const { row, col } = guardPosition
		guard.position = { row, col }
		map[row][col] = '.'
	}

	// Get the next direction based on the current direction
	const getNextDirection = (currentDirection) => {
		const directionsArray = [...directions.keys()]
		const nextIndex = (directionsArray.indexOf(currentDirection) + 1) % directionsArray.length

		return directionsArray[nextIndex]
	}

	/*
	 * Follow the path until the guard can't move anymore.
	 * Update the guard's position and direction based on the map.
	 * Keep track of the visited positions by the guard.
	 * Stop if the guard has visited a position before.
	 */
	while (true) {
		visited.add(`${guard.position.row},${guard.position.col}`)

		const [dr, dc] = directions.get(guard.direction)
		const newRow = guard.position.row + dr
		const newCol = guard.position.col + dc

		if (newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[0].length) {
			break
		}

		if (map[newRow][newCol] === '#') {
			guard.direction = getNextDirection(guard.direction)
		} else {
			guard.position = { row: newRow, col: newCol }
		}
	}

	return visited.size
}

console.log(predictPath())

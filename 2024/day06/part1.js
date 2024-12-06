/*
	Predict the path of the guard in the map
	- The guard starts at the '^' symbol
	- The guard moves in the direction it is facing
	- If the guard hits a wall ('#'), it turns right
	- If the guard hits an empty space ('.'), it moves forward
	- The guard stops when it reaches the edge of the map or when it revisits a cell
	- Return the number of cells visited by the guard
*/

import grid from './input.js'

const map = grid.split('\n').map((row) => row.split(''))

const directions = new Map([
	['up', [-1, 0]],
	['right', [0, 1]],
	['down', [1, 0]],
	['left', [0, -1]]
])

const findGuardPosition = (map) => {
	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		const colIndex = map[rowIndex].indexOf('^')

		if (colIndex !== -1) {
			return { row: rowIndex, col: colIndex }
		}
	}

	return null
}

const predictPath = () => {
	const visited = new Set()

	const guard = {
		direction: 'up',
		position: { row: 0, col: 0 }
	}

	const guardPosition = findGuardPosition(map)

	if (guardPosition) {
		const { row, col } = guardPosition
		guard.position = { row, col }
		map[row][col] = '.'
	}

	const getNextDirection = (currentDirection) => {
		const directionsArray = [...directions.keys()]
		const nextIndex = (directionsArray.indexOf(currentDirection) + 1) % directionsArray.length

		return directionsArray[nextIndex]
	}

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

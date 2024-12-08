import grid from './input.js'

const map = grid.split('\n').map((row) => row.split(''))

const directions = new Map([
	['up', [-1, 0]],
	['right', [0, 1]],
	['down', [1, 0]],
	['left', [0, -1]]
])

const guard = {
	direction: 'up',
	position: { row: 0, col: 0 }
}

const findGuardPosition = () => {
	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		const colIndex = map[rowIndex].indexOf('^')

		if (colIndex !== -1) {
			return { row: rowIndex, col: colIndex }
		}
	}

	return null
}

const setGuardPosition = (guard, guardPosition) => {
	if (guardPosition) {
		const { row, col } = guardPosition

		guard.position = { row, col }

		map[row][col] = '.'
	}
}

const getNextDirection = (currentDirection, directionsArray) => {
	const currentIndex = directionsArray.indexOf(currentDirection)
	const nextIndex = (currentIndex + 1) % directionsArray.length

	return directionsArray[nextIndex]
}

const moveGuard = (guard, directions, visited) => {
	const directionsArray = Array.from(directions.keys())

	while (true) {
		const positionKey = `${guard.position.row},${guard.position.col}`

		visited.add(positionKey)

		const [dr, dc] = directions.get(guard.direction)

		const newRow = guard.position.row + dr
		const newCol = guard.position.col + dc

		if (newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[0].length) {
			break
		}

		if (map[newRow][newCol] === '#') {
			guard.direction = getNextDirection(guard.direction, directionsArray)
		} else {
			guard.position = { row: newRow, col: newCol }
		}
	}
}

const predictPath = () => {
	const visited = new Set()

	setGuardPosition(guard, findGuardPosition())

	moveGuard(guard, directions, visited)

	return visited.size
}

console.log(predictPath())

import grid from './input.js'

const map = grid.split('\n').map((row) => row.split(''))

const directions = [
	{ name: 'up', symbol: '^', vector: [-1, 0] },
	{ name: 'right', symbol: '>', vector: [0, 1] },
	{ name: 'down', symbol: 'v', vector: [1, 0] },
	{ name: 'left', symbol: '<', vector: [0, -1] }
]

const findGuard = (map) => {
	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			const cell = map[row][col]

			const directionIndex = directions.findIndex((dir) => dir.symbol === cell)

			if (directionIndex !== -1) {
				return {
					row,
					col,
					directionIndex
				}
			}
		}
	}

	return null
}

const getNewPosition = (row, col, directionIndex) => {
	const [dr, dc] = directions[directionIndex].vector

	return { newRow: row + dr, newCol: col + dc }
}

const simulateGuard = (map, guard) => {
	let { row, col, directionIndex } = guard

	const visited = new Set()

	while (true) {
		const stateKey = `${row},${col},${directionIndex}`

		if (visited.has(stateKey)) {
			return { loop: true, visited: visited.size }
		}

		visited.add(stateKey)

		const { newRow, newCol } = getNewPosition(row, col, directionIndex)

		if (newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[0].length) {
			return { loop: false, visited: visited.size }
		}

		const nextCell = map[newRow][newCol]

		if (nextCell === '#') {
			directionIndex = (directionIndex + 1) % directions.length
		} else {
			;({ row, col } = { row: newRow, col: newCol })
		}
	}
}

const findObstructions = () => {
	const guard = findGuard(map)

	const possibleObstructions = []

	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			const cell = map[row][col]

			if (cell === '.' && !(row === guard.row && col === guard.col)) {
				possibleObstructions.push({ row, col })
			}
		}
	}

	let count = 0

	for (const obstruction of possibleObstructions) {
		const mapCopy = map.map((row) => [...row])

		mapCopy[obstruction.row][obstruction.col] = '#'

		const guardCopy = { row: guard.row, col: guard.col, directionIndex: guard.directionIndex }

		const simulationResult = simulateGuard(mapCopy, guardCopy)

		if (simulationResult.loop) {
			count += 1
		}
	}

	return count
}

console.log(findObstructions())

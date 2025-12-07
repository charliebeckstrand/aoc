import input from './input.js'

const manifold = input.map((line) => line.split(''))

const [height, width] = [manifold.length, manifold[0]?.length ?? 0]

const start = manifold.map((line, row) => ({ row, col: line.indexOf('S') })).find(({ col }) => col !== -1) ?? null

const cache = new Map()

const visited = (key, compute) => {
	if (cache.has(key)) return cache.get(key)

	const value = compute()

	cache.set(key, value)

	return value
}

const inbounds = (row, col) => row >= 0 && row < height && col >= 0 && col < width

const timelines = (row, col) => {
	if (!inbounds(row, col)) return BigInt(0)

	if (manifold[row][col] === '^') return BigInt(0)

	if (row === height - 1) return BigInt(1)

	return visited(`${row},${col}`, () => {
		const next = row + 1

		const branches = manifold[next][col] === '^' ? [col - 1, col + 1] : [col]

		return branches.reduce((sum, nextCol) => sum + timelines(next, nextCol), BigInt(0))
	})
}

const total = timelines(start.row, start.col)

console.log(total.toString())

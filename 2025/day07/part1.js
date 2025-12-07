import input from './input.js'

const manifold = input.map((line) => line.split(''))

const [height, width] = [manifold.length, manifold[0]?.length ?? 0]

const start = manifold.map((line, row) => ({ row, col: line.indexOf('S') })).find(({ col }) => col !== -1) ?? null

const queue = [start]

const visited = new Set([`${start.row},${start.col}`])

const inbounds = (row, col) => row >= 0 && row < height && col >= 0 && col < width

const visit = (row, col) => {
	if (!inbounds(row, col)) return

	const key = `${row},${col}`

	if (visited.has(key)) return

	const cell = manifold[row][col]

	if (cell === '^') return

	if (cell === '.') manifold[row][col] = '|'

	visited.add(key)

	queue.push({ row, col })
}

let splits = 0

for (const { row, col } of queue) {
	const next = row + 1

	if (next >= height) continue

	const splitter = manifold[next][col] === '^'

	if (splitter) splits += 1

	const offsets = splitter ? [-1, 1] : [0]

	offsets.forEach((offset) => visit(next, col + offset))
}

const rendered = manifold.map((chars) => chars.join('')).join('\n')

console.log(rendered)
console.log(`\nsplits: ${splits}\n`)

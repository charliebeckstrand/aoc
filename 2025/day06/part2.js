import input from './input.js'

const { width, rows, operators } = (() => {
	const width = input.reduce((max, line) => Math.max(max, line.length), 0)

	const padded = input.map((line) => line.padEnd(width, ' '))

	return { width, rows: padded.slice(0, -1), operators: padded.at(-1) }
})()

const operations = new Map([
	['+', (values) => values.reduce((sum, value) => sum + value, 0)],
	['*', (values) => values.reduce((product, value) => product * value, 1)]
])

function* rightToLeft(width) {
	for (let col = width - 1; col >= 0; col--) yield col
}

const { total } = Array.from(rightToLeft(width)).reduce(
	(state, col) => {
		const digits = rows.reduce((acc, line) => (line[col] === ' ' ? acc : acc + line[col]), '')

		if (digits) state.current.push(Number(digits))

		const operator = operations.get(operators[col])

		if (operator) {
			state.total += operator(state.current)
			state.current = []
		}

		return state
	},
	{ total: 0, current: [] }
)

console.log(total)

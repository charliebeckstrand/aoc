import input from './input.js'

const [rows, cols] = ((rows) => [rows, Math.max(...rows.map((row) => row.length))])(
	input.map((line) => line.trim().split(/\s+/))
)

const OPERATORS = new Set(['+', '*'])

const problems = (rows, cols) =>
	Array.from({ length: cols }, (_, col) => rows.map((row) => row[col])).map((cells) => {
		const operator = cells.find((cell) => OPERATORS.has(cell)) ?? null
		const numbers = cells.filter((cell) => !OPERATORS.has(cell)).map(Number)

		return { operator, numbers }
	})

const evaluateProblem = ({ operator, numbers }) =>
	operator === '+' ? numbers.reduce((a, b) => a + b, 0) : operator === '*' ? numbers.reduce((a, b) => a * b, 1) : null

const total = problems(rows, cols).reduce((sum, problem) => sum + evaluateProblem(problem), 0)

console.log(total)

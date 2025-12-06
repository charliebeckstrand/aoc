import input from './input.js'

const OPERATORS = new Set(['+', '*'])

const [rows, cols] = ((rows) => [rows, Math.max(...rows.map((row) => row.length))])(
	input.map((line) => line.trim().split(/\s+/))
)

const problems = (rows, cols) =>
	Array.from({ length: cols }, (_, col) => rows.map((row) => row[col])).map((tokens) => {
		const numbers = tokens.filter((token) => !OPERATORS.has(token)).map(Number)
		const operator = tokens.find((token) => OPERATORS.has(token)) ?? null

		return { numbers, operator }
	})

const evaluateProblem = ({ numbers, operator }) =>
	operator === '+' ? numbers.reduce((a, b) => a + b, 0) : operator === '*' ? numbers.reduce((a, b) => a * b, 1) : null

const total = problems(rows, cols).reduce((sum, problem) => sum + evaluateProblem(problem), 0)

console.log(total)

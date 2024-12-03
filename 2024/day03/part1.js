import program from './input.js'

const extractMuls = () => {
	// Find all instances of 'mul(x, y)' in the program
	let tokens = program.match(/mul\((\d+),(\d+)\)/g) || []

	// Extract the two numbers from each instance
	tokens = tokens.map((token) => token.match(/mul\((\d+),(\d+)\)/).slice(1))

	// Multiply the two numbers
	tokens = tokens.map((token) => token[0] * token[1])

	// Sum the results
	const result = tokens.reduce((acc, val) => acc + val, 0)

	return result
}

console.log(extractMuls())

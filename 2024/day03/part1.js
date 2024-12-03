import program from './input.js'

const extractMuls = () => {
	// Find all instances of 'mul(x, y)' in the program
	const matches = program.match(/mul\((\d+),(\d+)\)/g) || []

	// Extract the two numbers from each instance
	const pairs = matches.map((token) => token.match(/mul\((\d+),(\d+)\)/).slice(1))

	// Multiply the two numbers
	const products = pairs.map(([x, y]) => x * y)

	// Sum the results
	const result = products.reduce((acc, val) => acc + val, 0)

	return result
}

console.log(extractMuls())

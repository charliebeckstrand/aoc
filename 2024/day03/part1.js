import program from './input.js'

/*
 * Extract all instances of 'mul(x, y)' from the program and return the sum of the products.
 * 1. Find all instances of 'mul(x, y)' in the program
 * 2. Extract the two numbers from each instance
 * 3. Multiply the two numbers
 * 4. Return the sum of the products
 */
const extractMuls = () => {
	const muls = program.match(/mul\((\d+),(\d+)\)/g) || []
	const pairs = muls.map((token) => token.match(/mul\((\d+),(\d+)\)/).slice(1))
	const products = pairs.map(([x, y]) => x * y)

	return products.reduce((acc, val) => acc + val, 0)
}

console.log(extractMuls())

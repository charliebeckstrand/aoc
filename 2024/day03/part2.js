import program from './input.js'

const extractMulsWithConditions = () => {
	// Find all instances of 'mul(x, y)', 'do()', and "don't()" in the program
	const tokens = program.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g) || []

	// Initialize a flag to determine if the 'mul(x, y)' tokens should be processed
	let isEnabled = true

	// Iterate over the tokens and extract the two numbers from each 'mul(x, y)' token
	return tokens.reduce((sum, token) => {
		if (token === 'do()') {
			isEnabled = true
		} else if (token === "don't()") {
			isEnabled = false
		} else if (token.startsWith('mul') && isEnabled) {
			// Extract the two numbers from the 'mul(x, y)' token
			const [_, x, y] = token.match(/mul\((\d+),(\d+)\)/)

			// Multiply the two numbers and add the product to the sum
			return sum + x * y
		}
		return sum
	}, 0)
}

console.log(extractMulsWithConditions())

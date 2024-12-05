import program from './input.js'

/*
 * Extract all instances of 'mul(x, y)' from the program and return the sum of the products.
 * 1. Iterate through the tokens in the program.
 * 2. Enable the multiplication when 'do()' is encountered
 * 3. Disable the multiplication when "don't()" is encountered
 * 4. Multiply the two numbers when 'mul(x, y)' is encountered and the multiplication is enabled
 * 5. Return the sum of the products
 */
const extractMulsWithConditions = () => {
	const tokens = program.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g) || []

	return tokens.reduce(
		(state, token) => {
			if (token === 'do()') {
				state.isEnabled = true
			} else if (token === "don't()") {
				state.isEnabled = false
			} else if (token.startsWith('mul') && state.isEnabled) {
				// Extract the two numbers from the 'mul(x, y)' token
				const [_, x, y] = token.match(/mul\((\d+),(\d+)\)/)

				// Multiply the two numbers and add the result to the sum
				state.sum += x * y
			}
			return state
		},
		{ isEnabled: true, sum: 0 }
	).sum
}

console.log(extractMulsWithConditions())

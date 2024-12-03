import program from './input.js'

const extractMulsWithConditions = () => {
	// Find all instances of 'mul(x, y)', 'do()', and "don't()" in the program
	const tokens = program.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g) || []

	/*
	 * Iterate through the tokens in the program.
	 * Use a state to keep track of the sum and whether the 'do()' condition is enabled.
	 * The 'do()' condition is enabled by default.
	 * If the 'do()' condition is enabled, multiply the two numbers and add the result to the sum.
	 * If the 'don't()' condition is enabled, skip the multiplication.
	 * Return the sum.
	 */
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

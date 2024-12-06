import program from './input.js'

/*
	Extract the sum of all products from the program with conditions.
	- The program contains a series of 'mul' operations
	- The 'mul' operation multiplies two numbers
	- The 'do' and "don't" operations enable and disable the 'mul' operation
	- Return the sum of all products from the program with conditions
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
				const [_, x, y] = token.match(/mul\((\d+),(\d+)\)/)

				state.sum += x * y
			}
			return state
		},
		{ isEnabled: true, sum: 0 }
	).sum
}

console.log(extractMulsWithConditions())

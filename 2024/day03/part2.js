import program from './input.js'

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

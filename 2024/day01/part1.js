import lists from './input.js'

const left = []
const right = []

/*
 * Get the sum of the differences between the lists.
 * 1. Split the lists
 * 2. Sort the lists
 * 3. Get the differences
 * 4. Get the sum of the differences
 */
const getDifferences = () => {
	lists.split('\n').forEach((line) => {
		const [l, r] = line.split('   ')
		left.push(+l)
		right.push(+r)
	})

	left.sort((a, b) => a - b)
	right.sort((a, b) => a - b)

	const differences = left.map((l, i) => Math.abs(l - right[i]))

	return differences.reduce((a, b) => a + b, 0)
}

console.log(getDifferences())

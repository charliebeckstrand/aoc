import lists from './input.js'

const left = []
const right = []

// Split the lists
lists.split('\n').forEach((line) => {
	const [l, r] = line.split('   ')
	left.push(+l)
	right.push(+r)
})

// Sort the lists
left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

/*
 * Get the sum of the differences between the lists.
 * 1. Get the differences
 * 2. Return the sum of the differences
 */
const getDifferences = () => {
	const differences = left.map((l, i) => Math.abs(l - right[i]))

	return differences.reduce((a, b) => a + b, 0)
}

console.log(getDifferences())

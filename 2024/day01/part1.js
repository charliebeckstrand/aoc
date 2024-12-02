import lists from './input.js'

const { left, right } = { left: [], right: [] }

// Split the lists
lists.split('\n').forEach((line) => {
	const [l, r] = line.split('   ')
	left.push(+l)
	right.push(+r)
})

// Sort the lists
left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

// Get the differences
const differences = left.map((l, i) => Math.abs(l - right[i]))

// Get the sum of the differences
const sum = differences.reduce((a, b) => a + b, 0)

console.log(sum)

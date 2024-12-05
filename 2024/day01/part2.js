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
 * Get the sum of the products of the similarities between the lists.
 * 1. Check how many times each element in the left list appears in the right list
 * 2. Return the sum of the products
 */
const getSimilarity = () => {
	const similarity = left.reduce((acc, l) => acc + right.filter((r) => r === l).length * l, 0)

	return similarity
}

console.log(getSimilarity())

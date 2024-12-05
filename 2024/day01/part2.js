import lists from './input.js'

const left = []
const right = []

/*
 * Get the sum of the products of the similarities between the lists.
 * 1. Split the lists
 * 2. Sort the lists
 * 3. Check how many times each element in the left list appears in the right list
 * 4. Return the sum of the products
 */
const getSimilarity = () => {
	lists.split('\n').forEach((line) => {
		const [l, r] = line.split('   ')
		left.push(+l)
		right.push(+r)
	})

	left.sort((a, b) => a - b)
	right.sort((a, b) => a - b)

	const similarity = left.reduce((acc, l) => acc + right.filter((r) => r === l).length * l, 0)

	console.log(similarity)
}

console.log(getSimilarity())

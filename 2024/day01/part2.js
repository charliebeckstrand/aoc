/*
	Find the sum of the products of the similarities between the lists.
	- The lists contain integers
	- The lists are split by a tab character
	- Return the sum of the products of the similarities between the lists
*/

import lists from './input.js'

const left = []
const right = []

lists.split('\n').forEach((line) => {
	const [l, r] = line.split('   ')
	left.push(+l)
	right.push(+r)
})

left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

const getSimilarity = () => {
	const similarity = left.reduce((acc, l) => acc + right.filter((r) => r === l).length * l, 0)

	return similarity
}

console.log(getSimilarity())

import lists from './input.js'

/*
	Find the sum of the differences between the lists.
	- The lists contain integers
	- The lists are split by a tab character
	- Return the sum of the differences between the lists
*/

const left = []
const right = []

lists.split('\n').forEach((line) => {
	const [l, r] = line.split('   ')
	left.push(+l)
	right.push(+r)
})

left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

const getDifferences = () => {
	const differences = left.map((l, i) => Math.abs(l - right[i]))

	return differences.reduce((a, b) => a + b, 0)
}

console.log(getDifferences())

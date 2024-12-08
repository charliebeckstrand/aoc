import lists from './input.js'

const parseAndSortLists = () => {
	const pairs = lists
		.trim()
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => line.split(/\s{3,}/).map(Number))

	const left = pairs.map(([l]) => l).sort((a, b) => a - b)
	const right = pairs.map(([, r]) => r).sort((a, b) => a - b)

	return { left, right }
}

const { left, right } = parseAndSortLists()

const calculateSumOfDifferences = (left, right) => {
	return left.reduce((sum, value, index) => sum + Math.abs(value - right[index]), 0)
}

const getDifferences = () => calculateSumOfDifferences(left, right)

// Output the result
console.log(getDifferences())

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

const getSimilarity = () => {
	const similarity = left.reduce((acc, l) => acc + right.filter((r) => r === l).length * l, 0)

	return similarity
}

console.log(getSimilarity())

import input from './input.js'

const [ranges] = input
	.join('\n')
	.split('\n\n')
	.map((section) => section.split('\n'))

const sorted = ranges.map((range) => range.split('-').map(Number)).sort(([a], [b]) => a - b)

const coalesced = sorted.reduce((acc, [start, end]) => {
	const last = acc.at(-1)

	if (!last || start > last[1] + 1) {
		acc.push([start, end])
	} else {
		last[1] = Math.max(last[1], end)
	}

	return acc
}, [])

const result = coalesced.reduce((sum, [start, end]) => {
	const count = end - start + 1

	return sum + count
}, 0)

console.log(result)

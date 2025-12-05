import input from './input.js'

const [ranges] = input
	.join('\n')
	.split('\n\n')
	.map((section) => section.split('\n'))

const sorted = ranges.map((range) => range.split('-').map(Number)).sort(([a], [b]) => a - b)

const coalesced = []

sorted.forEach(([start, end]) => {
	const previous = coalesced[coalesced.length - 1]

	if (!previous || start > previous[1] + 1) {
		coalesced.push([start, end])
	} else {
		previous[1] = Math.max(previous[1], end)
	}
})

const result = coalesced.reduce((sum, [start, end]) => {
	const count = end - start + 1

	return sum + count
}, 0)

console.log(result)

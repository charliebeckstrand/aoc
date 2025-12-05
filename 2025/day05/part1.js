import input from './input.js'

const [ranges, ingredients] = input
	.join('\n')
	.split('\n\n')
	.map((section) => section.split('\n'))

const fresh = new Set()

ranges.forEach((range) => {
	const [start, end] = range.split('-').map(Number)

	ingredients
		.map(Number)
		.filter((id) => id >= start && id <= end)
		.forEach((id) => fresh.add(id))
})

const total = fresh.size

console.log(total)

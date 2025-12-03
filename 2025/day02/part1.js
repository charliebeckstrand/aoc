import ids from './input.js'

const sumInvalidIds = (ids) => {
	function* generateIds() {
		for (const id of ids) {
			const [first, last] = id.split('-').map(Number)

			for (let i = first; i <= last; i++) {
				yield i
			}
		}
	}

	return Array.from(generateIds())
		.filter((num) => /^(.+)\1$/.test(num.toString()))
		.reduce((sum, num) => sum + num, 0)
}

console.log(sumInvalidIds(ids))

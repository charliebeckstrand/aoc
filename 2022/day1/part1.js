import groups from 'input.js'

let sums = []

groups.forEach(group => {
	const array = group.split('\n')
	
	const sum = array.map((elt) => {
		return /^\d+$/.test(elt) ? parseInt(elt) : 0
	})
	.reduce((a, b) => {
		return a + b
	})
	
	sums.push(sum)
})

function findLargest () {
	const largest  = Math.max(...sums)
	
	console.log(`Larest number is ${largest}`)
	
	return largest
}

findLargest()

const groups = require('./input')

let sums = []

groups.forEach(group => {
	const array = group.split('\n')
	
	const sum = array.map((el) => {
		return /^\d+$/.test(el) ? parseInt(el) : 0
	})
	.reduce((a, b) => {
		return a + b
	})
	
	sums.push(sum)
})

function findLargest () {
	const largest  = Math.max(...sums)
		
	return largest
}

const largestNumber = findLargest()

console.log(largestNumber)

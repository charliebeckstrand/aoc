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

function findLargest3 () {
	sums.sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
	
	const largest3 = sums.slice(0, 3)
		
	findLargest3Sum(largest3)
	
	return largest3
}

function findLargest3Sum (largest3) {
	const total = largest3.reduce((a, b) => a + b, 0)
		
	return total
}

const sum = findLargest3Sum(findLargest3())

console.log(sum)

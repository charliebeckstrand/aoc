let spreadsheet = require('./input')

function getSum () {
	let sum = 0
	
	spreadsheet.forEach(row => {
		const numbers = row.split('\t')
		
		const divisible = checkDivision(numbers)
		
		sum += divisible
	})
	
	return sum
}

const sum = getSum()

console.log(sum)

function checkDivision (arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (i === j) {
				continue
			}
			
			if (arr[i] % arr[j] === 0) {
				return Math.max(arr[i], arr[j]) / Math.min(arr[i], arr[j])
			}
		}
	}

	return null
}
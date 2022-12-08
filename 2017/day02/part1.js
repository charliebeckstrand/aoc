let spreadsheet = require('./input')

function calculateChecksum () {	
	let checksum = 0

	spreadsheet.forEach(row => {
		const numbers = row.split('\t')
		
		const max = Math.max(...numbers)
		const min = Math.min(...numbers)
		
		const difference = max - min

		checksum += difference
	})
	
	return checksum
}

const checksum = calculateChecksum()

console.log(checksum)
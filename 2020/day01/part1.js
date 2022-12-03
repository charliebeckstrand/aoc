let report = require('./input')

function find2020 () {	
	let result
	
	report.forEach(i => {
		report.forEach(j => {
			if (i + j === 2020) {
				result = i * j
			}
		})
	})
	
	console.log(`Result is: ${result}`)
	
	return result
}

find2020()
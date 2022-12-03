let report = require('./input')

function find2020 () {	
	let result
	
	report.forEach(i => {
		report.forEach(j => {
			report.forEach(k => {
				if (i + j + k === 2020) {
					result = i * j * k
				}
			})
		})
	})
	
	console.log(`Result is: ${result}`)
	
	return result
}

find2020()
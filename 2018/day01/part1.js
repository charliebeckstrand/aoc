let frequencies = require('./input')

// convert frequencies into integers
frequencies = frequencies.map(Number)

function getFrequency () {	
	const frequency = frequencies.reduce((a, b) => a + b, 0)
	
	console.log(`Frequency is: ${frequency}`)
	
	return frequency
}

getFrequency()
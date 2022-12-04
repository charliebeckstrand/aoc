let frequencies = require('./input')

// convert frequencies into integers
frequencies = frequencies.map(Number)

function getFrequency () {
	let sum = 0
	let i = 0
	
	let results = new Set([0])
	
	while (true) {
		if (i == frequencies.length) {
			i = 0
			
			continue
		}
		
		sum += frequencies[i]
		
		if (results.has(sum)) {
			break
		}
		
		results.add(sum)
		
		i++
	}
	
	console.log(`Frequency is: ${sum}`)
	
	return sum
}

getFrequency()
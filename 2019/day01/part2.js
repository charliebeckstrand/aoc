const modules = require('./input')

function calcFuel () {
	let result = 0
		
	modules.forEach(module => {			
		let exponent = 0
		
		exponent += calculate(module)
		result += exponent
		
		while (calculate(exponent) > 0) {
			exponent = calculate(exponent)
			result += exponent
		}
	})
	
	console.log(`Fuel required is: ${result}`)
	
	return result
}

function calculate (input) {
	return Math.floor(input / 3) - 2
}

calcFuel()
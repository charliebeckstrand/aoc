const modules = require('./input')

function calcFuel () {
	let result = 0
		
	modules.forEach(module => {	
		const formula = Math.floor(module / 3) - 2
		
		result += formula
	})
	
	console.log(`Fuel required is: ${result}`)
	
	return result
}

calcFuel()
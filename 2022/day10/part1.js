const instructions = require('./input')

function getSignalStrength () {	
	let cycle = 0
	let x = 1
	
	return instructions.reduce((accumulator, instruction) => {
		let [type, number] = instruction.split(' ')
		
		cycle++
		
		if (cycle % 40 == 20) { accumulator += cycle * x }
		
		if (type == 'addx') {
			cycle++
			
			if (cycle % 40 == 20) { accumulator += cycle * x }
			
			x += Number(number)
		}
		
		return accumulator
	}, 0)
}

const signal = getSignalStrength()

console.log(signal)
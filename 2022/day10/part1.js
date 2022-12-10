const instructions = require('./input')

function execute () {	
	let cycle = 0
	let x = 1
	
	let signal = instructions.reduce((signal, instruction) => {
		let [type, number] = instruction.split(' ')
		
		cycle++
		
		if (cycle % 40 == 20) { signal += cycle * x }
		
		if (type == 'addx') {
			cycle++
			
			if (cycle % 40 == 20) { signal += cycle * x }
			
			x += Number(number)
		}
		
		return signal
	}, 0)
	
	return signal
}

const signal = execute()

console.log(signal)
const course = require('./input')

function calculatePosition () {
	let x = 0
	let depth = 0
	let result = 0
	
	course.forEach(instruction => {
		[path, amount] = instruction.split(' ')
		
		amount = Number(amount)
		
		if (path == 'forward') { x += amount }
		if (path == 'up') { depth -= amount }
		if (path == 'down') { depth += amount }
	})
	
	result = depth * x
	
	console.log(`Depth is ${depth}`)
	console.log(`Horizontal position is ${x}`)
	console.log(`Result is ${result} (${depth}} * ${x})`)
	
	return result
}

calculatePosition()
const instructions = require('./input')

function renderImage () {	
	let cycle = 0
	let sprite = 1
	let image = '\n'
	
	let drawPixel = () => {
		let position = cycle % 40
		
		image += (Math.abs(position - sprite) <= 1) ? '█' : ' '
		
		cycle++
		
		if (cycle % 40 == 0) { image += '\n' }
	}
	
	instructions.forEach(line => {
		let [instruction, number] = line.split(' ')
		
		drawPixel()
		
		if (instruction == 'addx') {
			drawPixel()
			sprite += parseInt(number)
		}
	})
	
	return image
}

const image = renderImage()

console.log(image)
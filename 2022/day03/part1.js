const compartments = require('./input')

let alphabet = 'abcdefghijklmnopqrstuvwxyz'
let priority = {}

function setPriority () {
	alphabet = alphabet.split('')
	
	alphabet.forEach((char, index) => {
		priority[char] = index + 1 
	})
	
	// convert alphabet array to uppercase
	alphabet = alphabet.map(char => { return char.toUpperCase() })
	
	alphabet.forEach((char, index) => {
		// point value needs to start at 26 for uppercase characters
		priority[char] = index + 1 + 26
	})
}

setPriority()

function calcPriority () {
	let sum = 0
	
	compartments.forEach(compartment => {
		const array = compartment.split('')
		const half = Math.ceil(array.length / 2) 
		
		const firstHalf = array.slice(0, half)
		const secondHalf = array.slice(half)

		const commonChar = firstHalf.find(char => secondHalf.includes(char))
		
		for (key in priority) {
			if (key === commonChar) { sum += priority[key] }
		}
	})
	
	return sum
}

const sum = calcPriority()

console.log(sum)
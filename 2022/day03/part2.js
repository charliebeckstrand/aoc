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

function calcBadgePriority () {	
	let sum = 0
	
	const groups = groupCompartments(compartments, 3)
	
	groups.forEach(group => {
		const first = group[0].split('')
		const second = group[1].split('')
		const third = group[2].split('')
		
		let arrays = [first, second, third]
		
		let commonCharacters = arrays.reduce((a, b) => a.filter(c => b.includes(c)))
		
		for (key in priority) {
			if (key === commonCharacters[0]) { sum += priority[key] }
		}
	})
	
	console.log(`Badge priority sum is: ${sum}`)
	
	return sum
}

calcBadgePriority()

function groupCompartments (array, size) {
	let group = []

	while(array.length > 0) {
		group.push(array.splice(0, size))
	}
	
	return group
}
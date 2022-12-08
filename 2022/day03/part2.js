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
		const bag1 = group[0].split('')
		const bag2 = group[1].split('')
		const bag3 = group[2].split('')
		
		let bags = [bag1, bag2, bag3]
		
		let commonCharacters = bags.reduce((a, b) => a.filter(c => b.includes(c)))
		
		for (key in priority) {
			if (key === commonCharacters[0]) { sum += priority[key] }
		}
	})
		
	return sum
}

const sum = calcBadgePriority()

console.log(sum)

function groupCompartments (array, size) {
	let group = []

	while(array.length > 0) {
		group.push(array.splice(0, size))
	}
	
	return group
}
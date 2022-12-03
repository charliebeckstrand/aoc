const compartments = require('./input')

let alphabet = 'abcdefghijklmnopqrstuvwxyz'
let priority = {}

function calcPriority () {
	let sum = 0
	
	compartments.forEach(compartment => {
		const array = compartment.split('')
		const half = Math.ceil(array.length / 2) 
		
		const firstHalf = array.slice(0, half)
		const secondHalf = array.slice(half)

		const commonChar = firstHalf.find(char => secondHalf.includes(char))
		
		sum += getSum(commonChar)
	})
	
	console.log(`Part 1, priority sum is: ${sum}`)
	
	return sum
}

function calcBadgePriority () {	
	let sum = 0
	
	const groups = groupCompartments(compartments, 3)
	
	groups.forEach(group => {
		const first = group[0].split('')
		const second = group[1].split('')
		const third = group[2].split('')
		
		let arrays = [first, second, third]
		
		let commonCharacters = arrays.reduce((a, b) => a.filter(c => b.includes(c)))
		
		sum += getSum(commonCharacters[0])
	})
	
	console.log(`Part 2, badge priority sum is: ${sum}`)
	
	return sum
}

function setPriority () {
	alphabet = alphabet.split('')
	
	alphabet.forEach((char, index) => {
		priority[char] = index + 1 
	})
	
	alphabet = alphabet.map(char => { return char.toUpperCase() }) 	// convert alphabet array to uppercase
	
	alphabet.forEach((char, index) => {
		priority[char] = index + 1 + 26 // point value needs to start at 26 for uppercase characters
	})
}

function groupCompartments (array, size) {
	let group = []

	while(array.length > 0) {
		group.push(array.splice(0, size))
	}
	
	return group
}

function getSum (char) {
	let sum = 0
	
	for (key in priority) {
		if (key === char) { sum += priority[key] }
	}

	return sum
}

setPriority()
calcPriority()
calcBadgePriority()
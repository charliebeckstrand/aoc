const compartments = require('./input')

let alphabet = 'abcdefghijklmnopqrstuvwxyz'
let priority = {}

function getSum (char) {
	let sum = 0
	
	for (key in priority) {
		if (key === char) { sum += priority[key] }
	}

	return sum
}

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

function setGroup (array, size) {
	let group = []

	while(array.length > 0) {
		group.push(array.splice(0, size))
	}
	
	return group
}

function findCommonLetter () {
	let sum = 0
	
	compartments.forEach(compartment => {
		const array = compartment.split('')
		const half = Math.ceil(array.length / 2) 
		
		const firstHalf = array.slice(0, half)
		const secondHalf = array.slice(half)

		const commonChar = firstHalf.find(char => secondHalf.includes(char))
		
		sum += getSum(commonChar)
	})
	
	console.log(`Part 1 sum is: ${sum}`)
	
	return sum
}

function findBadgePriority () {	
	let sum = 0
	
	const groups = setGroup(compartments, 3)
	
	groups.forEach(group => {
		const first = group[0].split('')
		const second = group[1].split('')
		const third = group[2].split('')
		
		let data = [first, second, third]
		
		let commonCharacters = data.reduce((a, b) => a.filter(c => b.includes(c)))
		
		sum += getSum(commonCharacters[0])
	})
	
	console.log(`Part 2 sum is: ${sum}`)
	
	return sum
}

setPriority()
findCommonLetter()
findBadgePriority()

const input = require('./input')

function findMessageMarker () {
	let checkedCharacters = new Set()
	let uniqueCharacters = 0
	
	for (let i = 0; i < input.length; i++) {
		const char = input[i]
		
		if (!checkedCharacters.has(char)) {
			checkedCharacters.add(char)
			
			uniqueCharacters++
		} else {
			checkedCharacters.clear()
			checkedCharacters.add(char)
			
			uniqueCharacters = 1
		}
		
		if (uniqueCharacters === 14) {
			return i + 1
		}
	}
	
	// If no message marker is found, return null
	return null
}

const messageMarker = findMessageMarker()

console.log(messageMarker)


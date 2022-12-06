const input = require('./input')

function findMarker () {
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
		
		if (uniqueCharacters === 4) {
			return i
		}
	}
	
	// If no market is found
	return null
}

console.log(findMarker())

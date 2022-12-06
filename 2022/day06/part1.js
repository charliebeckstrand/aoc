const input = require('./input')

function findMarker () {
	let checkedCharacters = new Set()
	let uniqueCharacters = 0
	
	input.forEach((char, index) => {
		if (!checkedCharacters.has(char)) {
			checkedCharacters.add(char)
			
			uniqueCharacters++
		} else {
			checkedCharacters.clear()
			checkedCharacters.add(char)
			
			uniqueCharacters = 1
		}
		
		if (uniqueCharacters === 4) {
			console.log(`Count is: ${index}`)
			
			input.length = 0 // end loop
		}
	})
}

findMarker()

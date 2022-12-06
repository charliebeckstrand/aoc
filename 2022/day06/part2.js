const input = require('./input')

function findMessageMarker () {
	let uniqueCharacters = 0
	let checkedCharacters = new Set()
	
	input.forEach((char, index) => {
		if (!checkedCharacters.has(char)) {
			checkedCharacters.add(char)
			
			uniqueCharacters++
		} else {
			checkedCharacters.clear()
			checkedCharacters.add(char)
			
			uniqueCharacters = 1
		}
		
		if (uniqueCharacters === 14) {
			console.log(`Count is: ${index + 1}`)

			input.length = 0 // end loop
		}
	})
}

findMessageMarker()

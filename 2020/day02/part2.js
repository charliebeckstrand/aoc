const items = require('./input')

function checkPasswords (items) {
	let validPasswords = 0
	
	items.forEach(item => {
		let [policy, password] = item.split(': ')
		let [positions, letter] = policy.split(' ') 
		let [position1, position2] = positions.split('-')
		
		position1 = parseInt(position1, 10)
		position2 = parseInt(position2, 10)
		
		if (
			match(password, letter, position1) &&
			!match(password, letter, position2)
		) {
			validPasswords++
		}
		
		else if (
			!match(password, letter, position1) &&
			match(password, letter, position2)
		) {
			validPasswords++
		}
	})

	return validPasswords
}

let validPasswords = checkPasswords(items)

console.log(validPasswords)

function match (password, letter, position) {
	let match = false
	
	for (let i = 0; i < password.length; i++) {
		let character = password[position - 1]
		
		if (character == letter) {
			match = true
		}
	}
	
	return match
}
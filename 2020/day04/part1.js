const passports = require('./input')

function countValidPassports (passports) {		
	const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
	
	let validPassportCount = 0

	passports.forEach(passport => {		
		const fields = passport.split(' ')
		const has = []
		
		fields.forEach(field => {
			const [key, value] = field.split(':')
			
			has.push(key)
		})
		
		const isValid = required.every(field => has.includes(field))
		
		if (isValid) { validPassportCount++ }
	})
	
	return validPassportCount
}

const validPassports = countValidPassports(passports)

console.log(validPassports)
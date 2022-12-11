const passports = require('./input')

function countValidPassports (passports) {
	const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
	
	const fieldValidators = {
		byr: value => {			
			if (!/^\d{4}$/.test(value)) return false
			
			const year = parseInt(value, 10)

			return year >= 1920 && year <= 2002
		},
		iyr: value => {
			if (!/^\d{4}$/.test(value)) return false

			const year = parseInt(value, 10)
			
			return year >= 2010 && year <= 2020
		},
		eyr: value => {
			if (!/^\d{4}$/.test(value)) return false

			const year = parseInt(value, 10)
			
			return year >= 2020 && year <= 2030
		},
		hgt: value => {
			if (!/^\d+(cm|in)$/.test(value)) return false

			const number = parseInt(value, 10)
			const unit = value.substring(value.length - 2)
			
			if (unit === 'cm') return number >= 150 && number <= 193
			if (unit === 'in') return number >= 59 && number <= 76
			return false
		},
		hcl: value => {
			return /^#[0-9a-f]{6}$/.test(value)
		},
		ecl: value => {
			return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
		},
		pid: value => {
			return /^\d{9}$/.test(value)
		}
	}
	
	let validPassportCount = 0
	
	passports.forEach(passport => {
		const fields = passport.split(' ')
		const fieldMap = {}
		
		fields.forEach(field => {
			const [key, value] = field.split(':')
			
			fieldMap[key] = value
		})
	
		const isValid = requiredFields.every(field => {
			const value = fieldMap[field]
			
			if (value === undefined) return false
			
			return fieldValidators[field](value)
		})
		
		if (isValid) validPassportCount++
	})
	
	return validPassportCount
}


const validPassports = countValidPassports(passports)

console.log(validPassports)
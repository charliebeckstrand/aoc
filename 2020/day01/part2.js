const input = require('./input')

function findProduct(numbers) {
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			for (let k = j + 1; k < numbers.length; k++) {
				if (numbers[i] + numbers[j] + numbers[k] === 2020) {
					const product = numbers[i] * numbers[j] * numbers[k]
					return product
				}
			}
		}
	}
	// If no three numbers sum to 2020, return null
	return null
}

console.log(findProduct(input))
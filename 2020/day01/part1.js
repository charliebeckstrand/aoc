const input = require('./input')

function findProduct(numbers) {
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[i] + numbers[j] === 2020) {
				const product = numbers[i] * numbers[j]
				return product
			}
		}
	}
	// If no two numbers sum to 2020, return null
	return null
}

console.log(findProduct(input))

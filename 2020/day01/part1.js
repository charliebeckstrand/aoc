const input = require('./input')

function findProduct(numbers) {
	// Loop through each number in the array
	for (let i = 0; i < numbers.length; i++) {
		// Loop through the remaining numbers in the array (starting at the next index)
		for (let j = i + 1; j < numbers.length; j++) {
			// Check if the current numbers sum to 2020
			if (numbers[i] + numbers[j] === 2020) {
				const product = numbers[i] * numbers[j]
				// Return the product of the two numbers
				return product
			}
		}
	}
	// If no two numbers sum to 2020, return null
	return null
}

console.log(findProduct(input))

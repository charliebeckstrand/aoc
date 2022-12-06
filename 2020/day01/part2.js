const input = require('./input')

function findProduct(numbers) {
	// Loop through each number in the array
	for (let i = 0; i < numbers.length; i++) {
		// Loop through the remaining numbers in the array (starting at the next index)
		for (let j = i + 1; j < numbers.length; j++) {
			// Loop through the remaining numbers in the array (starting at the next index)
			for (let k = j + 1; k < numbers.length; k++) {
				// Check if the current numbers sum to 2020
				if (numbers[i] + numbers[j] + numbers[k] === 2020) {
					const product = numbers[i] * numbers[j] * numbers[k]
					// Return the product of the three numbers
					return product
				}
			}
		}
	}
	// If no three numbers sum to 2020, return null
	return null
}

console.log(findProduct(input))
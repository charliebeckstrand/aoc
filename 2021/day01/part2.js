const items = require('./input')

function countCalories () {
	let count = 0
		
	for (let i = 0; i < items.length - 3; i++) {
		const a = items[i]
		const b = items[i + 1]
		const c = items[i + 2]
		const d = items[i + 3]
		
		const current = a + b + c
		const next = b + c + d
		
		if (next > current) {
			count++
		}
	}
	
	console.log(`Calorie count is: ${count}`)
	
	return count
}

countCalories()
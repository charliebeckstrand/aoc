import items from 'input.js'

let count = 0
	
items.forEach((item, index) => {	
	let prev = index > 0 ? array[index - 1] : null
	
	if (item > prev) {
		count++
	}
})

console.log(count)
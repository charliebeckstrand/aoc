import items from 'input.js'

let count = 0
	
for (let i = 0; i < items.length - 3; i++) {
	const a = array[i]
	const b = array[i + 1]
	const c = array[i + 2]
	const d = array[i + 3]
	
	const current = a + b + c
	const next = b + c + d
	
	if (next > current) {
		count++
	}
}

console.log(count)
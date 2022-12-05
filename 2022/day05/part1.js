const input = require('./input')
const stacks = [
	['W', 'R', 'F'],
	['T', 'H', 'M', 'C', 'D', 'V', 'W', 'P'],
	['P', 'M', 'Z', 'N', 'P'],
	['J', 'C', 'H', 'R'],
	['C', 'P', 'G', 'H', 'Q', 'T', 'B'],
	['G', 'C', 'W', 'L', 'F', 'Z'],
	['W', 'V', 'L', 'Q', 'Z', 'J', 'G', 'C'],
	['P', 'N', 'R', 'F', 'W', 'T', 'V', 'C'],
	['J', 'W', 'H', 'G', 'R', 'S', 'V']
]
const moves = input.filter(i => i.startsWith('move'))

function setStacks () {
	let result = null
	
	moves.forEach(move => {
		const operations = move.split(' ').map(Number).filter(Number)

		let [amount, from, to] = operations
		
		from = from - 1	
		to = to - 1
		
		for (let i = 0; i < amount; i++) {
			stacks[to].push(stacks[from].pop())
		}
	})
	
	result = stacks.map(stack => stack[stack.length - 1]).join('')
	
	console.log(`Result is: ${result}`)	
}

setStacks()

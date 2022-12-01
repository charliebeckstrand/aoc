import calories from 'calories.js'

const groups = calories.split('\n\n')
let sums = []

groups.forEach(group => {
	let trimmed = group.trim()
	let array = group.split('\n')
	
	const sum = array.map((elt) => {
    return /^\d+$/.test(elt) ? parseInt(elt) : 0
  })
  .reduce((a, b) => {
    return a + b
  })
	
	sums.push(sum)
})

console.log(Math.max(...sums))

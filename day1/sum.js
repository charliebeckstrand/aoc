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

function findLargest () {
	console.log(Math.max(...sums))
	return Math.max(...sums)
}


function findLargest3 () {
	sums.sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
	
	const largest3 = sums.slice(0, 3)
	const total = largest3.reduce((a, b) => a + b, 0)
	
	console.log(`3 largest numbers are: ${sums.slice(0, 3)}`)
	console.log(`Their sum is: ${total}`)
	
	return largest3
}

findLargest()
findLargest3()

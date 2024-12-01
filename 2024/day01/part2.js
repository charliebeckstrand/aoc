import lists from './input.js'

const { left, right } = { left: [], right: [] }

// split the lists
lists.split('\n').forEach((line) => {
	const [l, r] = line.split('   ')
	left.push(+l)
	right.push(+r)
})

// sort the lists
left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

/*
    check how many times each element in the left list appears in the right list
    then multiply by that value
    then sum all the values
*/
const similarity = left.reduce((acc, l) => acc + right.filter((r) => r === l).length * l, 0)

console.log(similarity)

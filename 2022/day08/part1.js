const input = require('./input')

function gridToArray (grid) {
	const rows = grid.split('\n')
	const result = []
	
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i].split('')
		result.push(row)
	}
	
	return result
}

const grid = gridToArray(input)

function countVisibleTrees () {
	let count = 0
		
	for (let y = 0; y < grid.length; y++) {		
		for (let x = 0; x < grid[y].length; x++) {
			if (visible(y, x).includes(true)) { count++ }
		}
	}
	
	return count
}

const count = countVisibleTrees()

console.log(count)

function visible (y, x) {
	let [edge, up, down, left, right] = [true, true, true, true, true]
	
	if (
		y !== 0 ||
		x !== 0 ||
		y !== grid.length - 1 ||
		x !== grid[y].length - 1
	) {
		edge = false
	}
	
	for (let i = 0; i < x; i++) {
		if (grid[i][y] >= grid[x][y]) {
			up = false
			break
		}
	}
	
	for (let i = grid.length - 1; i > x; i--) {
		if (grid[i][y] >= grid[x][y]) {
			down = false
			break
		}
	}
	
	for (let i = 0; i < y; i++) {
		if (grid[x][i] >= grid[x][y]) {
			left = false
			break
		}
	}
	
	for (let i = grid.length - 1; i > y; i--) {
		if (grid[x][i] >= grid[x][y]) {
			right = false
			break
		}
	}
	
	return [edge, up, down, left, right]
}
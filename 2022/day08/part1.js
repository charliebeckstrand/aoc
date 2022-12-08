const grid = require('./input')

function countVisibleTrees () {
	let count = 0
		
	for (let i = 0; i < grid.length; i++) {		
		for (let j = 0; j < grid[i].length; j++) {
			if (visible(i, j).includes(true)) { count++ }
		}
	}
	
	return count
}

const count = countVisibleTrees()

console.log(count)

function visible (i, j) {
	let [edge, up, down, left, right] = [true, true, true, true, true]
	
	if (
		i !== 0 || 
		j !== 0 || 
		i !== grid.length - 1 ||
		j !== grid[i].length - 1
	) {
		edge = false
	}
	
	for (let k = 0; k < j; k++) {
		if (grid[k][i] >= grid[j][i]) {
			up = false
			break
		}
	}
	
	for (let k = grid.length - 1; k > j; k--) {
		if (grid[k][i] >= grid[j][i]) {
			down = false
			break
		}
	}
	
	for (let k = 0; k < i; k++) {
		if (grid[j][k] >= grid[j][i]) {
			left = false
			break
		}
	}
	
	for (let k = grid.length - 1; k > i; k--) {
		if (grid[j][k] >= grid[j][i]) {
			right = false
			break
		}
	}
	
	return [edge, up, down, left, right]
}
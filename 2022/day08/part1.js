const grid = require('./input')

function countVisibleTrees (grid) {
	let count = 0
		
	for (let i = 0; i < grid.length; i++) {		
		for (let j = 0; j < grid[i].length; j++) {
			if (i == 0 || j == 0 || j == grid[i].length - 1 || i == grid.length - 1) {
				count++
				continue
			}
			
			let [up, down, left, right] = [true, true, true, true]
			
			up = visibleFromUp(grid, i, j)
			down = visibleFromDown(grid, i, j)
			left = visibleFromLeft(grid, i, j)
			right = visibleFromRight(grid, i, j)
			
			if ([up, down, left, right].includes(true)) { count++ }
		}
	}
	
	return count
}

const count = countVisibleTrees(grid)

console.log(count)

function visibleFromUp (grid, i, j) {
	let visible = true
	
	for (let k = 0; k < j; k++) {
		if (grid[k][i] >= grid[j][i]) {
			visible = false
			break
		}
	}
	
	return visible
}

function visibleFromDown (grid, i, j) {
	let visible = true
	
	for (let k = grid.length - 1; k > j; k--) {
		if (grid[k][i] >= grid[j][i]) {
			visible = false
			break
		}
	}
	
	return visible
}

function visibleFromLeft (grid, i, j) {
	let visible = true
	
	for (let k = 0; k < i; k++) {
		if (grid[j][k] >= grid[j][i]) {
			visible = false
			break
		}
	}
	
	return visible
}

function visibleFromRight (grid, i, j) {
	let visible = true
	
	for (let k = grid.length - 1; k > i; k--) {
		if (grid[j][k] >= grid[j][i]) {
			visible = false
			break
		}
	}
	
	return visible
}
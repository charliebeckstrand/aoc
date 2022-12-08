const path = require('path')
const fs = require('fs')

const input = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

function gridToArray (grid) {
	const rows = grid.split('\n')
	const result = []
	
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i].split('')
		result.push(row)
	}
	
	return result
}

module.exports = gridToArray(input)
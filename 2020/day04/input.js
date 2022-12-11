const path = require('path')
const fs = require('fs')

const input = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
.split('\n\n')
.map((line) => {
	return line.split('\n').join(' ')
})

module.exports = input
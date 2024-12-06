/*
	Extract the sum of all products from the program.
	- The program contains a series of 'mul' operations
	- The 'mul' operation multiplies two numbers
	- Return the sum of all products from the program
*/

import program from './input.js'

const extractMuls = () => {
	const muls = program.match(/mul\((\d+),(\d+)\)/g) || []
	const pairs = muls.map((token) => token.match(/mul\((\d+),(\d+)\)/).slice(1))
	const products = pairs.map(([x, y]) => x * y)

	return products.reduce((acc, val) => acc + val, 0)
}

console.log(extractMuls())

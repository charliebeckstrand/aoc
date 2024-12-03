import program from './input.js'

const extractMuls = () => {
	// Find all instances of 'mul(x, y)' in the program
	let muls = program.match(/mul\((\d+),(\d+)\)/g) || []

	// Extract the two numbers from each instance
	muls = muls.map((mul) => mul.match(/mul\((\d+),(\d+)\)/).slice(1))

	// Multiply the two numbers
	muls = muls.map((mul) => mul[0] * mul[1])

	// Sum the results
	return muls.reduce((acc, val) => acc + val, 0)
}

console.log(extractMuls())

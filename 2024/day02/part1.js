/*
	Find the number of safe reports.
	- The reports contain a series of levels
	- The levels are integers
	- The levels are safe if the difference between them is 1 or 3
	- Return the total count of safe reports
*/

import reports from './input.js'

const isSafe = (levels) => {
	const diffs = levels.slice(1).map((level, i) => level - levels[i])

	return diffs.every((diff) => diff >= 1 && diff <= 3) || diffs.every((diff) => diff >= -3 && diff <= -1)
}

const safeReports = reports.filter((report) => {
	const levels = report.split(' ').map(Number)

	return isSafe(levels)
})

console.log(safeReports.length)

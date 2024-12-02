import reports from './input.js'

const isSafe = (levels) => {
	// Remove the first level (0) and map the differences between levels
	const diffs = levels.slice(1).map((level, i) => level - levels[i])

	// Check if the differences are in the range of 1 to 3 or -3 to -1
	return diffs.every((diff) => diff >= 1 && diff <= 3) || diffs.every((diff) => diff >= -3 && diff <= -1)
}

const safeReports = reports.filter((report) => {
	// Convert the report to an array of numbers
	const levels = report.split(' ').map(Number)

	// Check if the report is safe
	return isSafe(levels)
})

console.log(safeReports.length)

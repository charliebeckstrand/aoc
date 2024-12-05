import reports from './input.js'

/*
 * Check if the levels in the report are safe.
 * 1. Remove the first level (0) and map the differences between levels
 * 2. Check if the differences are in the range of 1 to 3 or -3 to -1
 */
const isSafe = (levels) => {
	const diffs = levels.slice(1).map((level, i) => level - levels[i])

	return diffs.every((diff) => diff >= 1 && diff <= 3) || diffs.every((diff) => diff >= -3 && diff <= -1)
}

/*
 * Filter out the safe reports and count them.
 * 1. Convert the report to an array of numbers
 * 2. Check if the report is safe or if there is a level that can be removed to make it safe
 * 3. Filter out the safe reports
 * 4. Count the safe reports
 */
const safeReportsWithProblemDampener = reports.filter((report) => {
	const levels = report.split(' ').map(Number)

	return isSafe(levels) || levels.some((_, i) => isSafe(levels.filter((_, j) => j !== i)))
})

console.log(safeReportsWithProblemDampener.length)

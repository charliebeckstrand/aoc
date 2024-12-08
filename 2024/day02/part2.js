import reports from './input.js'

const isSafe = (levels) => {
	const diffs = levels.slice(1).map((level, i) => level - levels[i])

	return diffs.every((diff) => diff >= 1 && diff <= 3) || diffs.every((diff) => diff >= -3 && diff <= -1)
}

const safeReportsWithProblemDampener = reports.filter((report) => {
	const levels = report.split(' ').map(Number)

	return isSafe(levels) || levels.some((_, i) => isSafe(levels.filter((_, j) => j !== i)))
})

console.log(safeReportsWithProblemDampener.length)

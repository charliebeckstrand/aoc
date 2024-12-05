import safetyManual from './input.js'

// Parse the safety manual into rules and updates
const [rulesSection, updatesSection] = safetyManual.trim().split('\n\n')

// Convert rules into an array of [X, Y] page number pairs
const rules = rulesSection.split('\n').map((rule) => rule.split('|').map(Number))

// Convert updates into an array of page numbers
const updates = updatesSection.split('\n').map((update) => update.split(',').map(Number))

// Function to validate if an update follows all applicable rules
const isUpdateValid = (update, rules) => {
	const pageIndex = new Map(update.map((page, idx) => [page, idx]))

	/*
	 * An update is valid if:
	 * 1. Both pages are present in the update
	 * 2. The first page appears before the second page
	 */
	return rules
		.filter(([x, y]) => pageIndex.has(x) && pageIndex.has(y))
		.every(([x, y]) => pageIndex.get(x) < pageIndex.get(y))
}

/*
 * Process all updates to find the sum of the middle pages.
 * 1. Filter updates based on the rules
 * 2. Extract the middle page from each update
 * 3. Sum all middle pages
 */
const sumOfMiddlePages = updates
	.filter((update) => isUpdateValid(update, rules))
	.map((update) => update[Math.floor(update.length / 2)])
	.reduce((sum, page) => sum + page, 0)

console.log(sumOfMiddlePages)

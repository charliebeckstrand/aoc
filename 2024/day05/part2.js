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

// Function to perform Topological Sort on an update based on the rules
const topologicalSort = (update, rules) => {
	// Filter rules that are applicable to the update (i.e. both pages are present)
	const applicableRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y))

	// Initialize adjacency list with empty arrays for all pages
	const adjacency = new Map(update.map((page) => [page, []]))

	// Initialize inDegree of all pages to 0
	const inDegree = new Map(update.map((page) => [page, 0]))

	// Build the graph
	for (const [x, y] of applicableRules) {
		adjacency.get(x).push(y)
		inDegree.set(y, inDegree.get(y) + 1)
	}

	// Initialize queue with pages having inDegree 0
	const queue = update.filter((page) => inDegree.get(page) === 0)

	const sorted = []

	/*
	 * Perform Topological Sort
	 * 1. Remove the current page from the queue
	 * 2. Add the current page to the sorted list
	 * 3. Decrement the inDegree of all neighbors
	 * 4. If the inDegree of a neighbor becomes 0, add it to the queue
	 * 5. Repeat until the queue is empty
	 */
	while (queue.length > 0) {
		const current = queue.shift()

		sorted.push(current)

		for (const neighbor of adjacency.get(current)) {
			inDegree.set(neighbor, inDegree.get(neighbor) - 1)
			if (inDegree.get(neighbor) === 0) queue.push(neighbor)
		}
	}

	// If the sorted list is shorter than the update, there is a cycle in the graph and the update is invalid
	if (sorted.length !== update.length) {
		throw new Error(`Cannot perform topological sort on update: ${update.join(',')}`)
	}

	return sorted
}

// Separate updates into valid and invalid
const { validUpdates, invalidUpdates } = updates.reduce(
	(acc, update) => {
		isUpdateValid(update, rules) ? acc.validUpdates.push(update) : acc.invalidUpdates.push(update)
		return acc
	},
	{ validUpdates: [], invalidUpdates: [] }
)

/*
 * Process all updates to find valid ones and sum their middle pages
 * 1. Perform Topological Sort on each valid update
 * 2. Extract the middle page from each update
 * 3. Sum all middle pages
 */
const sumOfMiddlePages = validUpdates
	.map((update) => topologicalSort(update, rules)[Math.floor(update.length / 2)])
	.reduce((sum, page) => sum + page, 0)

// Reorder invalid updates and sum their middle pages
const sumInvalidMiddlePages = invalidUpdates.reduce((sum, update) => {
	try {
		const sorted = topologicalSort(update, rules)
		return sum + sorted[Math.floor(sorted.length / 2)]
	} catch (error) {
		console.error(`Error sorting update ${update}: ${error.message}`)
		return sum
	}
}, 0)

// Output the sum of middle pages for valid and invalid updates
console.log(`Valid updates: ${sumOfMiddlePages}`)
console.log(`Invalid updates: ${sumInvalidMiddlePages}`)

/*
	Parse the safety manual to find the sum of the middle pages
	- The safety manual is divided into two sections: rules and updates
	- The rules section contains pairs of page numbers separated by '|'
	- The updates section contains page numbers separated by ','
	- Perform Topological Sort on each update to find the middle page
	- Return the sum of the middle pages of all valid updates
*/

import safetyManual from './input.js'

const [rulesSection, updatesSection] = safetyManual.trim().split('\n\n')

const rules = rulesSection.split('\n').map((rule) => rule.split('|').map(Number))
const updates = updatesSection.split('\n').map((update) => update.split(',').map(Number))

const isUpdateValid = (update, rules) => {
	const pageIndex = new Map(update.map((page, idx) => [page, idx]))

	return rules
		.filter(([x, y]) => pageIndex.has(x) && pageIndex.has(y))
		.every(([x, y]) => pageIndex.get(x) < pageIndex.get(y))
}

const topologicalSort = (update, rules) => {
	const applicableRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y))

	const adjacency = new Map(update.map((page) => [page, []]))
	const inDegree = new Map(update.map((page) => [page, 0]))

	for (const [x, y] of applicableRules) {
		adjacency.get(x).push(y)
		inDegree.set(y, inDegree.get(y) + 1)
	}

	const queue = update.filter((page) => inDegree.get(page) === 0)

	const sorted = []

	while (queue.length > 0) {
		const current = queue.shift()

		sorted.push(current)

		for (const neighbor of adjacency.get(current)) {
			inDegree.set(neighbor, inDegree.get(neighbor) - 1)
			if (inDegree.get(neighbor) === 0) queue.push(neighbor)
		}
	}

	if (sorted.length !== update.length) {
		throw new Error(`Cannot perform topological sort on update: ${update.join(',')}`)
	}

	return sorted
}

const { validUpdates, invalidUpdates } = updates.reduce(
	(acc, update) => {
		isUpdateValid(update, rules) ? acc.validUpdates.push(update) : acc.invalidUpdates.push(update)
		return acc
	},
	{ validUpdates: [], invalidUpdates: [] }
)

const sumOfMiddlePages = validUpdates
	.map((update) => topologicalSort(update, rules)[Math.floor(update.length / 2)])
	.reduce((sum, page) => sum + page, 0)

const sumInvalidMiddlePages = invalidUpdates.reduce((sum, update) => {
	try {
		const sorted = topologicalSort(update, rules)
		return sum + sorted[Math.floor(sorted.length / 2)]
	} catch (error) {
		console.error(`Error sorting update ${update}: ${error.message}`)
		return sum
	}
}, 0)

console.log(`Valid updates: ${sumOfMiddlePages}`)
console.log(`Invalid updates: ${sumInvalidMiddlePages}`)

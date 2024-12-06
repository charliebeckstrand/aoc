/*
	Parse the safety manual to find the sum of the middle pages
	- The safety manual is divided into two sections: rules and updates
	- The rules section contains pairs of page numbers separated by '|'
	- The updates section contains page numbers separated by ','
	- An update is valid if it follows all applicable rules
	- An update is invalid if it violates any rule
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

const sumOfMiddlePages = updates
	.filter((update) => isUpdateValid(update, rules))
	.map((update) => update[Math.floor(update.length / 2)])
	.reduce((sum, page) => sum + page, 0)

console.log(sumOfMiddlePages)

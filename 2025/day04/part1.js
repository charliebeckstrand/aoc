import input from './input.js'

const grid = input.map((line) => [...line])

const DIRECTIONS = new Map([
	['N', [-1, 0]],
	['NE', [-1, 1]],
	['E', [0, 1]],
	['SE', [1, 1]],
	['S', [1, 0]],
	['SW', [1, -1]],
	['W', [0, -1]],
	['NW', [-1, -1]]
])

const cell = (row, col) => (row >= 0 && col >= 0 ? grid.at(row)?.at(col) ?? null : null)

const surrounding = (row, col, char) =>
	Array.from(DIRECTIONS.values()).filter(([dr, dc]) => cell(row + dr, col + dc) === char).length

const accessible = (row, r) =>
	row.reduce((count, cell, c) => count + (cell === '@' && surrounding(r, c, '@') < 4 ? 1 : 0), 0)

const total = grid.reduce((count, row, r) => count + accessible(row, r), 0)

console.log(total)

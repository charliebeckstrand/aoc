import banks from './input.js'

const batteries = banks.map((bank) => bank.split('').map(Number))

const getMaximumJoltage = (bank) => {
	const cache = new Map()

	const selectBest = (excluded, included, digit) => {
		const options = [excluded, included !== null && digit + included].filter(Boolean)

		return options.sort((a, b) => b.localeCompare(a))[0] ?? null
	}

	const selectDigits = (pos, count) => {
		if (count === 0 || pos > bank.length - count) return ''

		const key = `${pos},${count}`

		if (cache.has(key)) return cache.get(key)

		const excluded = selectDigits(pos + 1, count)
		const included = selectDigits(pos + 1, count - 1)

		const best = selectBest(excluded, included, bank[pos])

		cache.set(key, best)

		return best
	}

	return Number(selectDigits(0, 12))
}

const sumJoltage = () => batteries.reduce((total, bank) => total + getMaximumJoltage(bank), 0)

console.log(sumJoltage())

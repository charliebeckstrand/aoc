import banks from './input.js'

const batteries = banks.map((bank) => bank.split('').map(Number))

const turnOnBatteries = (battery1, battery2) => Number(`${battery1}${battery2}`)

const getMaximumJoltage = (bank) =>
	Math.max(
		...bank.flatMap((battery1, i) =>
			bank.filter((_, j) => j > i).map((battery2) => turnOnBatteries(battery1, battery2))
		)
	)

const sumJoltage = () => batteries.reduce((total, bank) => total + getMaximumJoltage(bank), 0)

console.log(sumJoltage())

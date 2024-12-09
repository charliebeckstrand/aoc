import grid from './input.js'

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b))

const getAntennaPairs = (antennas) =>
	antennas.flatMap((antenna, i) => antennas.slice(i + 1).map((other) => [antenna, other]))

const countAntinodes = () => {
	const antennas = []

	grid.forEach((row, y) => {
		for (let x = 0; x < row.length; x++) {
			const char = row[x]

			if (char !== '.') {
				antennas.push({ x, y, frequency: char })
			}
		}
	})

	const frequencies = new Map()

	antennas.forEach((antenna) => {
		if (!frequencies.has(antenna.frequency)) {
			frequencies.set(antenna.frequency, [])
		}

		frequencies.get(antenna.frequency).push(antenna)
	})

	const antinodes = new Set()

	for (const antennasWithFrequency of frequencies.values()) {
		const antennaPairs = getAntennaPairs(antennasWithFrequency)

		antennaPairs.forEach(([antenna1, antenna2]) => {
			let A = antenna2.y - antenna1.y
			let B = antenna1.x - antenna2.x
			let C = antenna2.x * antenna1.y - antenna1.x * antenna2.y

			const divisor = gcd(gcd(A, B), C)

			A /= divisor
			B /= divisor
			C /= divisor

			if (A < 0 || (A === 0 && B < 0)) {
				A = -A
				B = -B
				C = -C
			}

			const lineKey = `line:${A},${B},${C}`

			if (!antinodes.has(lineKey)) {
				antinodes.add(lineKey)

				grid.forEach((row, y) => {
					for (let x = 0; x < row.length; x++) {
						if (A * x + B * y + C === 0) {
							antinodes.add(`${x},${y}`)
						}
					}
				})
			}
		})
	}

	const uniqueAntinodes = [...antinodes].filter((item) => !item.startsWith('line:'))

	return uniqueAntinodes.length
}

console.log(countAntinodes())

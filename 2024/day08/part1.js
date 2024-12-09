import grid from './input.js'

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

	frequencies.forEach((antennaList) => {
		if (antennaList.length < 2) return

		antennaList.forEach((A, i) => {
			antennaList.slice(i + 1).forEach((B) => {
				const { x: Ax, y: Ay } = A
				const { x: Bx, y: By } = B

				const P1 = { x: 2 * Bx - Ax, y: 2 * By - Ay }
				const P2 = { x: 2 * Ax - Bx, y: 2 * Ay - By }

				const points = [P1, P2]

				points
					.filter(({ x, y }) => grid[y]?.[x] !== undefined)
					.forEach(({ x, y }) => antinodes.add(`${x},${y}`))
			})
		})
	})

	return antinodes.size
}

console.log(countAntinodes())

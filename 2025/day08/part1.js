import input from './input.js'

const coordinates = input.map((line) => line.split(',').map(Number))

const distances = []

const getDistance = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2

for (const [boxA, coordA] of coordinates.entries()) {
	for (const [boxB, coordB] of coordinates.entries()) {
		if (boxB > boxA) {
			distances.push({
				distance: getDistance(coordA, coordB),
				pair: [boxA, boxB]
			})
		}
	}
}

distances.sort((a, b) => a.distance - b.distance)

const circuits = new Map(coordinates.map((_, i) => [i, new Set([i])]))

for (const { pair } of distances.slice(0, 1000)) {
	const [key1, key2] = pair.map((index) => [...circuits.keys()].find((key) => circuits.get(key).has(index)))

	if (key1 === key2) continue

	circuits.set(key1, new Set([...circuits.get(key1), ...circuits.get(key2)]))

	circuits.delete(key2)
}

const circuitSizes = [...circuits.values()].map((set) => set.size)

circuitSizes.sort((a, b) => b - a)

const largestThree = circuitSizes.slice(0, 3)

const product = largestThree.reduce((a, c) => a * c, 1)

console.log(product)

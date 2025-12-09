import input from './input.js'

const coordinates = input.map((line) => line.split(',').map(Number))

const getDistance = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2

const distances = coordinates.flatMap((first, from) =>
	coordinates.slice(from + 1).map((second, to) => ({
		distance: getDistance(first, second),
		pair: [from, from + 1 + to]
	}))
)

distances.sort((a, b) => a.distance - b.distance)

const groups = new Map(coordinates.map((_, i) => [i, new Set([i])]))

for (const { pair } of distances.slice(0, 1000)) {
	const [key1, key2] = pair.map((index) => [...groups.keys()].find((key) => groups.get(key).has(index)))

	if (key1 === key2) continue

	groups.set(key1, new Set([...groups.get(key1), ...groups.get(key2)]))

	groups.delete(key2)
}

const sizes = Array.from(groups.values()).map((set) => set.size)

const product = sizes
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((a, c) => a * c, 1)

console.log(product)

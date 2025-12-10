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

const circuit = coordinates.map((_, i) => i)

const find = (i) => (circuit[i] === i ? i : (circuit[i] = find(circuit[i])))

let groups = coordinates.length
let boxes = []

for (const {
	pair: [i, j]
} of distances) {
	const [a, b] = [find(i), find(j)]

	if (a === b) continue

	circuit[b] = a

	boxes = [i, j]

	if (--groups === 1) break
}

const [x1, x2] = boxes.map((i) => coordinates[i][0])

console.log(x1 * x2)

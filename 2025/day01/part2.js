import rotations from './input.js'

const DIAL_SIZE = 100

let position = 50
let count = 0

const rotate = (position, direction, amount) =>
	(position + amount * (direction === 'R' ? 1 : -1) + DIAL_SIZE * 1000) % DIAL_SIZE

const countZeros = (position, direction, amount) => {
	const rotationAmount = amount * (direction === 'R' ? 1 : -1)

	if (rotationAmount === 0) return 0

	const distance = Math.abs(rotationAmount)
	const threshold = rotationAmount > 0 ? (DIAL_SIZE - position) % DIAL_SIZE : position

	if (threshold === 0) return Math.floor(distance / DIAL_SIZE)
	if (distance >= threshold) return 1 + Math.floor((distance - threshold) / DIAL_SIZE)

	return 0
}

rotations.forEach((rotation) => {
	const { direction, amount } = rotation.match(/^(?<direction>[RL])(?<amount>\d+)$/).groups

	count += countZeros(position, direction, Number(amount))
	position = rotate(position, direction, Number(amount))
})

console.log(count)

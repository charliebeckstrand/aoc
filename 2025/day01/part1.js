import rotations from './input.js'

const DIAL_SIZE = 100

let position = 50
let count = 0

const rotate = (position, direction, amount) =>
	(position + amount * (direction === 'R' ? 1 : -1) + DIAL_SIZE) % DIAL_SIZE

rotations.forEach((rotation) => {
	const { direction, amount } = rotation.match(/^(?<direction>[RL])(?<amount>\d+)$/).groups

	position = rotate(position, direction, Number(amount))

	if (position === 0) count++
})

console.log(count)

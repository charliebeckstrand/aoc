function getSignalStrength(instructions) {
    let cycle = 0
    let x = 1

    return instructions.reduce((accumulator, instruction) => {
        let [type, amount] = instruction.split(' ')

        cycle++

        if (cycle % 40 == 20) {
            accumulator += cycle * x
        }

        if (type == 'addx') {
            cycle++

            if (cycle % 40 == 20) {
                accumulator += cycle * x
            }

            x += Number(amount)
        }

        return accumulator
    }, 0)
}

const instructions = require('./input')
const result = getSignalStrength(instructions)

console.log(result)

function renderImage(instructions) {
    let cycle = 0
    let sprite = 1
    let image = '\n'

    let drawPixel = () => {
        let position = cycle % 40

        image += Math.abs(position - sprite) <= 1 ? '█' : ' '

        cycle++

        if (cycle % 40 == 0) {
            image += '\n'
        }
    }

    instructions.forEach((line) => {
        let [instruction, amount] = line.split(' ')

        drawPixel()

        if (instruction == 'addx') {
            drawPixel()
            sprite += Number(amount)
        }
    })

    return image
}

const instructions = require('./input')
const result = renderImage(instructions)

console.log(result)

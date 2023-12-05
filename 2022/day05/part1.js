const stacks = [
    ['W', 'R', 'F'],
    ['T', 'H', 'M', 'C', 'D', 'V', 'W', 'P'],
    ['P', 'M', 'Z', 'N', 'P'],
    ['J', 'C', 'H', 'R'],
    ['C', 'P', 'G', 'H', 'Q', 'T', 'B'],
    ['G', 'C', 'W', 'L', 'F', 'Z'],
    ['W', 'V', 'L', 'Q', 'Z', 'J', 'G', 'C'],
    ['P', 'N', 'R', 'F', 'W', 'T', 'V', 'C'],
    ['J', 'W', 'H', 'G', 'R', 'S', 'V']
]

function setStacks(moves) {
    let result = null

    moves.forEach((move) => {
        const operations = move.split(' ').map(Number).filter(Number)
        const [amount, from, to] = operations

        for (let i = 0; i < amount; i++) {
            stacks[to - 1].push(stacks[from - 1].pop())
        }
    })

    result = stacks.map((stack) => stack[stack.length - 1]).join('')

    return result
}

const input = require('./input')
const moves = input.filter((i) => i.startsWith('move'))
const result = setStacks(moves)

console.log(result)

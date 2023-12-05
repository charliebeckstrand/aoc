const position = {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 }
}
const visited = new Set(['0,0'])

const moveHead = (direction, steps) => {
    for (let i = 0; i < steps; i++) {
        switch (direction) {
            case 'R':
                position.head.x++
                break
            case 'L':
                position.head.x--
                break
            case 'U':
                position.head.y--
                break
            case 'D':
                position.head.y++
                break
        }
        moveTail()
    }
}

const moveTail = () => {
    const dx = position.head.x - position.tail.x
    const dy = position.head.y - position.tail.y

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        position.tail.x += Math.sign(dx)
        position.tail.y += Math.sign(dy)
    }

    visited.add(`${position.tail.x},${position.tail.y}`)
}

const executeMoves = (moves) => {
    moves.forEach((move) => {
        const [direction, steps] = move.split(' ')

        moveHead(direction, parseInt(steps))
    })

    return visited.size
}

const moves = require('./input')
const result = executeMoves(moves)

console.log(result)

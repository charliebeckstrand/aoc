const knots = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }))
const visited = new Set(['0,0'])

const updateKnotPositions = () => {
    for (let i = 1; i < knots.length; i++) {
        const dx = knots[i - 1].x - knots[i].x
        const dy = knots[i - 1].y - knots[i].y

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            knots[i].x += Math.sign(dx)
            knots[i].y += Math.sign(dy)
        }
    }

    const tail = knots[knots.length - 1]

    visited.add(`${tail.x},${tail.y}`)
}

const moveHead = (direction, steps) => {
    for (let i = 0; i < steps; i++) {
        switch (direction) {
            case 'R':
                knots[0].x++
                break
            case 'L':
                knots[0].x--
                break
            case 'U':
                knots[0].y--
                break
            case 'D':
                knots[0].y++
                break
        }

        updateKnotPositions()
    }
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

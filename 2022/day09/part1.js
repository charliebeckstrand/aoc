const moves = require('./input')

const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }
const visited = new Set(['0,0'])

const moveHead = (direction, steps) => {
    for (let i = 0; i < steps; i++) {
        switch (direction) {
            case 'R':
                head.x++
                break
            case 'L':
                head.x--
                break
            case 'U':
                head.y--
                break
            case 'D':
                head.y++
                break
        }
        moveTail()
    }
}

const moveTail = () => {
    // Calculate differences in x and y positions
    const dx = head.x - tail.x
    const dy = head.y - tail.y

    // If the head and tail are not adjacent
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Move the tail towards the head
        tail.x += Math.sign(dx)
        tail.y += Math.sign(dy)
    }

    // Record the new position of the tail
    visited.add(`${tail.x},${tail.y}`)
}

const executeMoves = (moves) => {
    moves.forEach((move) => {
        const [direction, steps] = move.split(' ')
        moveHead(direction, parseInt(steps))
    })

    return visited.size
}

const uniquePositions = executeMoves(moves)

console.log(uniquePositions)

const directions = {
    N: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 }
}

const connections = {
    '|': [directions.S, directions.N],
    '-': [directions.W, directions.E],
    L: [directions.N, directions.E],
    J: [directions.N, directions.W],
    7: [directions.S, directions.W],
    F: [directions.S, directions.E]
}

const getLinks = (direction, x, y, start) => {
    if (direction === 'S') {
        start.x = x
        start.y = y

        return []
    }

    return connections[direction] || []
}

const updateLinksAroundPosition = (map, start) => {
    const { x, y } = start

    const isWithinMap = (dx, dy) => x + dx >= 0 && x + dx < map[0].length && y + dy >= 0 && y + dy < map.length

    const updateLink = (currentDirection, neighborDirection, dx, dy) => {
        if (isWithinMap) {
            const currentCell = map[y][x]
            const neighborCell = map[y + dy][x + dx]

            if (neighborCell.links.includes(currentDirection)) {
                currentCell.links.push(neighborDirection)
            }
        }
    }

    updateLink(directions.E, directions.W, -1, 0)
    updateLink(directions.W, directions.E, 1, 0)
    updateLink(directions.S, directions.N, 0, -1)
    updateLink(directions.N, directions.S, 0, 1)
}

const calculateShortestDistances = (map, start) => {
    const stack = [{ position: start, distance: 0 }]

    while (stack.length > 0) {
        const { position, distance } = stack.shift()

        if (map[position.y][position.x].distance !== undefined && map[position.y][position.x].distance <= distance) {
            continue
        }

        map[position.y][position.x].distance = distance
        map[position.y][position.x].links.forEach((direction) =>
            stack.push({
                position: {
                    x: position.x + direction.x,
                    y: position.y + direction.y
                },
                distance: distance + 1
            })
        )
    }
}

const findMaxDistanceFromStart = (input) => {
    const start = {}

    const grid = input.split('\n').map((row) => row.split(''))
    const map = grid.map((row, y) =>
        row.map((direction, x) => ({
            links: getLinks(direction, x, y, start)
        }))
    )

    updateLinksAroundPosition(map, start)
    calculateShortestDistances(map, start)

    return Math.max(...map.flat().map((position) => position.distance || 0))
}

const input = require('./input')
const result = findMaxDistanceFromStart(input)

console.log(result)

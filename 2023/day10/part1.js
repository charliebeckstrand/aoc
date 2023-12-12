const directions = {
    N: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 }
}

// prettier-ignore
const connections = {
    '|': [directions.S, directions.N],
    '-': [directions.W, directions.E],
    'L': [directions.N, directions.E],
    'J': [directions.N, directions.W],
    '7': [directions.S, directions.W],
    'F': [directions.S, directions.E]
}

const updateNeighborLinks = (map, start) => {
    const withinMap = (x, y) => x >= 0 && x < map[0].length && y >= 0 && y < map.length

    const updateLinks = (currentDirection, neighborDirection, x, y) => {
        const neighborX = start.x + x
        const neighborY = start.y + y

        if (withinMap(neighborX, neighborY)) {
            const currentTile = map[start.y][start.x]
            const neighborTile = map[neighborY][neighborX]

            if (neighborTile.links.includes(currentDirection)) {
                currentTile.links.push(neighborDirection)
            }
        }
    }

    const directionPairs = [
        { current: directions.E, neighbor: directions.W, x: -1, y: 0 },
        { current: directions.W, neighbor: directions.E, x: 1, y: 0 },
        { current: directions.S, neighbor: directions.N, x: 0, y: -1 },
        { current: directions.N, neighbor: directions.S, x: 0, y: 1 }
    ]

    directionPairs.forEach(({ current, neighbor, x, y }) => {
        updateLinks(current, neighbor, x, y)
    })
}

const calculateShortestDistances = (map, start) => {
    const stack = [{ position: start, distance: 0 }]

    while (stack.length > 0) {
        const { position, distance } = stack.shift()

        const currentTile = map[position.y][position.x]

        const tileAlreadyVisited = currentTile.distance !== undefined && currentTile.distance <= distance

        if (tileAlreadyVisited) {
            continue
        }

        currentTile.distance = distance

        currentTile.links.forEach((direction) => {
            const newPosition = { x: position.x + direction.x, y: position.y + direction.y }

            stack.push({
                position: newPosition,
                distance: distance + 1
            })
        })
    }
}

const findMaxDistanceFromStart = (input) => {
    const start = {
        x: 0,
        y: 0
    }

    const getLinks = (direction, x, y, start) => {
        if (direction === 'S') {
            start.x = x
            start.y = y

            return []
        }

        return connections[direction] || []
    }

    const grid = input.split('\n').map((row) => row.split(''))
    const map = grid.map((row, y) =>
        row.map((direction, x) => ({
            links: getLinks(direction, x, y, start)
        }))
    )

    updateNeighborLinks(map, start)
    calculateShortestDistances(map, start)

    return Math.max(...map.flat().map((position) => position.distance || 0))
}

const input = require('./input')
const result = findMaxDistanceFromStart(input)

console.log(result)

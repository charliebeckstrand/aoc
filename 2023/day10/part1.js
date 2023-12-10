const directions = {
    N: 0,
    S: 1,
    E: 2,
    W: 3
}

const directionOffsets = [
    { x: 0, y: -1 }, // N
    { x: 0, y: 1 }, // S
    { x: 1, y: 0 }, // E
    { x: -1, y: 0 } // W
]

const directionConnections = {
    '|': [directions.S, directions.N],
    '-': [directions.W, directions.E],
    L: [directions.N, directions.E],
    J: [directions.N, directions.W],
    7: [directions.S, directions.W],
    F: [directions.S, directions.E]
}

const getLinkedDirections = (direction, x, y, start) => {
    if (direction === 'S') {
        start.x = x
        start.y = y

        return []
    }

    return directionConnections[direction] || []
}

const parseGrid = (input) => {
    return input.split('\n').map((row) => row.split(''))
}

const generateMap = (grid, start) => {
    return grid.map((row, y) =>
        row.map((direction, x) => ({
            links: getLinkedDirections(direction, x, y, start)
        }))
    )
}

const updateLinksAroundPosition = (map, start) => {
    const updateLinks = (condition, y, x, direction) => {
        if (condition) {
            map[y][x].links.push(direction)
        }
    }

    updateLinks(start.x > 0 && map[start.y][start.x - 1].links.includes(directions.E), start.y, start.x, directions.W)
    updateLinks(
        start.x < map[0].length - 1 && map[start.y][start.x + 1].links.includes(directions.W),
        start.y,
        start.x,
        directions.E
    )
    updateLinks(start.y > 0 && map[start.y - 1][start.x].links.includes(directions.S), start.y, start.x, directions.N)
    updateLinks(
        start.y < map.length - 1 && map[start.y + 1][start.x].links.includes(directions.N),
        start.y,
        start.x,
        directions.S
    )
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
                    x: position.x + directionOffsets[direction].x,
                    y: position.y + directionOffsets[direction].y
                },
                distance: distance + 1
            })
        )
    }
}

const findMaxDistanceFromStart = (input) => {
    const start = {}
    const grid = parseGrid(input)
    const map = generateMap(grid, start)

    updateLinksAroundPosition(map, start)
    calculateShortestDistances(map, start)

    return Math.max(...map.flat().map((position) => position.distance || 0))
}

const input = require('./input')
const result = findMaxDistanceFromStart(input)

console.log(result)

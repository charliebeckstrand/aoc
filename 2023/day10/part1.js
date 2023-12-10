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

const generateMap = (grid, start) => {
    return grid.map((row, y) =>
        row.map((direction, x) => ({
            links: getLinks(direction, x, y, start)
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
    const map = generateMap(grid, start)

    updateLinksAroundPosition(map, start)
    calculateShortestDistances(map, start)

    return Math.max(...map.flat().map((position) => position.distance || 0))
}

const input = require('./input')
const result = findMaxDistanceFromStart(input)

console.log(result)

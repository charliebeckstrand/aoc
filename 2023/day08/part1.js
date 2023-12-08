const getSteps = (currentNode, directions, nodes) => {
    let steps = 0

    while (currentNode.node !== 'ZZZ') {
        const direction = directions[steps % directions.length]

        currentNode = nodes.find((node) => node.node === (direction === 'L' ? currentNode.left : currentNode.right))

        steps++
    }

    return steps
}

const processInput = (input) => {
    const [directionsLine, ...nodeLines] = input.split('\n').filter(Boolean)
    const directions = directionsLine.split('')
    const nodes = nodeLines.map((line) => {
        const [node, neighbors] = line.split(' = ')
        const [left, right] = neighbors.slice(1, -1).split(', ')

        return { node, left, right }
    })

    return { directions, nodes }
}

const input = require('./input')
const { directions, nodes } = processInput(input)
const result = getSteps(
    nodes.find((node) => node.node === 'AAA'),
    directions,
    nodes
)

console.log(result)

const findGreatestCommonDivisor = (a, b) => (!b ? a : findGreatestCommonDivisor(b, a % b))
const findLeastCommonMultiple = (a, b) => (a / findGreatestCommonDivisor(a, b)) * b
const findLeastCommonMultipleOfArray = (arr) => arr.reduce(findLeastCommonMultiple, 1)

const getSteps = (currentNode, directions, nodes) => {
    let steps = 0

    while (currentNode[currentNode.length - 1] !== 'Z') {
        const direction = directions[steps % directions.length]

        currentNode = nodes[currentNode][direction]

        steps++
    }

    return steps
}

const processInput = (input) => {
    const [directionLine, ...nodeLines] = input.split('\n').filter(Boolean)
    const directions = directionLine.split('')
    const nodes = nodeLines.reduce((acc, line) => {
        const [node, directions] = line.split(' = ')
        const [left, right] = directions.slice(1, -1).split(', ')

        acc[node] = { L: left, R: right }

        return acc
    }, {})
    const startingNodes = Object.keys(nodes).filter((node) => node.endsWith('A'))

    return { directions, nodes, startingNodes }
}

const input = require('./input')
const { directions, nodes, startingNodes } = processInput(input)
const result = findLeastCommonMultipleOfArray(
    startingNodes.map((currentNode) => getSteps(currentNode, directions, nodes))
)

console.log(result)

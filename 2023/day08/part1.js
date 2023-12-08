const move = (currentNode, direction, nodes) => {
    return nodes.find((node) => node.node === (direction === 'L' ? currentNode.left : currentNode.right))
}

const findZZZ = (currentNode, instructions, nodes) => {
    let steps = 0

    while (currentNode.node !== 'ZZZ') {
        const direction = instructions[steps % instructions.length]

        currentNode = move(currentNode, direction, nodes)

        steps++
    }

    return steps
}

const processInput = (input) => {
    const [firstLine, ...otherLines] = input.split('\n').filter(Boolean)
    const instructions = firstLine.split('')
    const nodes = otherLines.map((line) => {
        const [node, directions] = line.split(' = ')
        const [left, right] = directions.slice(1, -1).split(', ')

        return { node, left, right }
    })

    return {
        instructions,
        nodes
    }
}

const input = require('./input')
const { instructions, nodes } = processInput(input)
const result = findZZZ(
    nodes.find((node) => node.node === 'AAA'),
    instructions,
    nodes
)

console.log(result)

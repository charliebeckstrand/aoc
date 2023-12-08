const move = (currentNode, direction, nodes) => {
    const nextNode = nodes.find((node) => node.node === (direction === 'L' ? currentNode.left : currentNode.right))

    return nextNode
}

const findZZZ = (instructions, nodes) => {
    let currentNode = nodes.find((node) => node.node === 'AAA')
    let count = 0

    while (currentNode.node !== 'ZZZ') {
        const direction = instructions[count % instructions.length]

        currentNode = move(currentNode, direction, nodes)

        count++
    }

    return count
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
const map = processInput(input)
const result = findZZZ(map.instructions, map.nodes)

console.log(result)

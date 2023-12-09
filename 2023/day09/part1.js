const processInput = (input) => {
    return input.split('\n').map((line) => line.split(' ').map((val) => Number(val)))
}

const calculateDifferences = (sequence) => {
    let differences = []

    for (let i = 0; i < sequence.length - 1; i++) {
        differences.push(sequence[i + 1] - sequence[i])
    }

    return differences
}

const processSequence = (sequence) => {
    let layers = [sequence]
    let currentLayer = sequence

    while (!currentLayer.every((val) => val === 0)) {
        currentLayer = calculateDifferences(currentLayer)

        layers.push(currentLayer)
    }

    return layers
}

const sumOfExtrapolatedValues = (data) => {
    const values = data
        .map((sequence) => processSequence(sequence))
        .map((layers) => layers.reduce((acc, layer) => acc + layer[layer.length - 1], 0))

    return values.reduce((sum, nextValue) => sum + nextValue, 0)
}

const input = require('./input')
const oasisAndSandInstabilitySensor = processInput(input)
const result = sumOfExtrapolatedValues(oasisAndSandInstabilitySensor)

console.log(result)

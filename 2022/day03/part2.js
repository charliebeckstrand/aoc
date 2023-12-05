function setPriority() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let priority = {}

    alphabet = alphabet.split('')

    alphabet.forEach((char, index) => {
        priority[char] = index + 1
    })

    alphabet = alphabet.map((char) => {
        return char.toUpperCase()
    })

    alphabet.forEach((char, index) => {
        priority[char] = index + 1 + 26
    })

    return priority
}

function groupCompartments(array, size) {
    let group = []

    while (array.length > 0) {
        group.push(array.splice(0, size))
    }

    return group
}

function calcBadgePriority(compartments, priority) {
    let sum = 0

    const groups = groupCompartments(compartments, 3)

    groups.forEach((group) => {
        let bags = group.map((item) => item.split(''))

        let commonCharacters = bags.reduce((a, b) => a.filter((c) => b.includes(c)))

        for (key in priority) {
            if (key === commonCharacters[0]) {
                sum += priority[key]
            }
        }
    })

    return sum
}

const compartments = require('./input')
const priority = setPriority()
const result = calcBadgePriority(compartments, priority)

console.log(result)

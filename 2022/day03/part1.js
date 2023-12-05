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

function calcPriority(compartments, priority) {
    let sum = 0

    compartments.forEach((compartment) => {
        const array = compartment.split('')
        const half = Math.ceil(array.length / 2)

        const firstHalf = array.slice(0, half)
        const secondHalf = array.slice(half)

        const commonChar = firstHalf.find((char) => secondHalf.includes(char))

        for (key in priority) {
            if (key === commonChar) {
                sum += priority[key]
            }
        }
    })

    return sum
}

const compartments = require('./input')
const priority = setPriority()
const result = calcPriority(compartments, priority)

console.log(result)

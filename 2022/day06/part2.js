function findMessageMarker(input) {
    let checkedCharacters = new Set()
    let uniqueCharacters = 0

    for (let i = 0; i < input.length; i++) {
        const char = input[i]

        if (!checkedCharacters.has(char)) {
            checkedCharacters.add(char)

            uniqueCharacters++
        } else {
            checkedCharacters.clear()
            checkedCharacters.add(char)

            uniqueCharacters = 1
        }

        if (uniqueCharacters === 14) {
            return i + 1
        }
    }

    return null
}

const input = require('./input')
const result = findMessageMarker(input)

console.log(result)

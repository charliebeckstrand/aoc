function findMarker(input) {
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

        if (uniqueCharacters === 4) {
            return i
        }
    }

    return null
}

const input = require('./input')
const result = findMarker(input)

console.log(result)

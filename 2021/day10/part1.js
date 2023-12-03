const lines = require('./input')

function getSyntaxErrorScore(lines) {
    let curruptedChunks = []

    lines.forEach((line) => {
        curruptedChunks.push(findCorruptedChunk(line))
    })

    return getPoints(curruptedChunks)
}

function findCorruptedChunk(line) {
    const stack = []

    const closingChars = new Map([
        [')', '('],
        ['}', '{'],
        [']', '['],
        ['>', '<']
    ])

    for (const char of line) {
        if (mapValuesIncludes(closingChars, char)) {
            stack.push(char)
        } else if (mapKeysIncludesCharacter(closingChars, char)) {
            if (stack.length === 0 || stack[stack.length - 1] !== closingChars.get(char)) {
                return char
            } else {
                stack.pop()
            }
        }
    }

    return null
}

function mapKeysIncludesCharacter(map, character) {
    const values = Array.from(map.keys())

    return values.includes(character)
}

function mapValuesIncludes(map, char) {
    const values = Array.from(map.values())

    return values.includes(char)
}

function getPoints(arr) {
    let totalPoints = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ')') {
            totalPoints += 3
        } else if (arr[i] === ']') {
            totalPoints += 57
        } else if (arr[i] === '}') {
            totalPoints += 1197
        } else if (arr[i] === '>') {
            totalPoints += 25137
        }
    }

    return totalPoints
}

const result = getSyntaxErrorScore(lines)

console.log(result)

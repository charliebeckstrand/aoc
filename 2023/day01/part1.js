const getNumber = (chars, reverse) => {
    if (reverse) chars = [...chars].reverse()

    return chars.find((char) => !isNaN(char)) || 0
}

const getNumbers = (item) => {
    const chars = item.split('')

    const firstNumber = getNumber(chars)
    const lastNumber = getNumber(chars, (reverse = true))

    return parseInt(firstNumber + lastNumber)
}

const items = require('./input')
const result = items.reduce((acc, item) => acc + getNumbers(item), 0)

console.log(result)

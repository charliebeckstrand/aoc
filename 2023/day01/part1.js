const items = require('./input')

const getNumber = (chars, reverse) => {
    // reverse the array if we're looking for the last number
    if (reverse) chars = [...chars].reverse()

    return chars.find((char) => !isNaN(char)) || 0
}

const concatNumbers = (item) => {
    // split the string into an array of characters
    const chars = item.split('')

    const firstNumber = getNumber(chars)
    const lastNumber = getNumber(chars, (reverse = true))

    // return the sum of the first and last numbers
    return parseInt(firstNumber + lastNumber)
}

// reduce the array of items to a single value
const total = items.reduce((acc, item) => acc + concatNumbers(item), 0)

console.log(`Total sum is: ${total}`)

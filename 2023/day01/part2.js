const items = require('./input')

const getNumbers = (item) => {
    // create an object with number words as keys and their corresponding numbers as values
    const numberWords = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }

    let matches = []
    let i = 0

    // loop through each character in the string
    while (i < item.length) {
        let matched = false
        // loop through each number word
        for (const [word, number] of Object.entries(numberWords)) {
            if (item.substr(i, word.length) === word) {
                matches.push(number)
                i += word.length - 1
                matched = true
                break
            }
        }
        if (!matched) {
            if (/\d/.test(item[i])) {
                matches.push(item[i])
            }
            i++
        }
    }

    // if no numbers were found, return 0
    if (matches.length === 0) {
        console.log(`No numbers found in "${item}"`)
        return 0
    }

    const firstNumber = matches[0]
    const lastNumber = matches[matches.length - 1]

    // return the sum of the first and last numbers
    return parseInt(firstNumber + lastNumber)
}

// reduce the array of items to a single value
const total = items.reduce((acc, item) => acc + getNumbers(item), 0)

console.log(`Total sum is: ${total}`)

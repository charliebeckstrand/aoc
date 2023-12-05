const getNumbers = (item) => {
    const numberWords = {
        nine: '9',
        eight: '8',
        seven: '7',
        six: '6',
        five: '5',
        four: '4',
        three: '3',
        two: '2',
        one: '1'
    }

    let matches = []
    let i = 0

    while (i < item.length) {
        let matched = false

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

    if (matches.length === 0) {
        console.log(`No numbers found in "${item}"`)
        return 0
    }

    const firstNumber = matches[0]
    const lastNumber = matches[matches.length - 1]

    return parseInt(firstNumber + lastNumber)
}

const items = require('./input')
const result = items.reduce((acc, item) => acc + getNumbers(item), 0)

console.log(result)

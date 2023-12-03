const items = require('./input')

function match(password, letter, min, max) {
    let match = false
    let count = 0

    for (let i = 0; i < password.length; i++) {
        let char = password[i]

        if (char === letter) {
            count++
        }
    }

    if (count >= min && count <= max) {
        match = true
    }

    return match
}

function checkPasswords(items) {
    let validPasswords = 0

    items.forEach((item) => {
        let [policy, password] = item.split(': ')
        let [range, letter] = policy.split(' ')
        let [min, max] = range.split('-')

        min = parseInt(min, 10)
        max = parseInt(max, 10)

        if (match(password, letter, min, max)) {
            validPasswords++
        }
    })

    return validPasswords
}

const validPasswords = checkPasswords(items)

console.log(validPasswords)

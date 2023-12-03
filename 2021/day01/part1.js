const items = require('./input')

function countCalories() {
    let count = 0

    items.forEach((item, index) => {
        let prev = index > 0 ? items[index - 1] : null

        if (item > prev) {
            count++
        }
    })

    return count
}

const result = countCalories()

console.log(result)

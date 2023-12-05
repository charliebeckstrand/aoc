function findLargest3Sum(largest3) {
    return largest3.reduce((a, b) => a + b, 0)
}

function findLargest3(groups) {
    let sums = []

    groups.forEach((group) => {
        const array = group.split('\n')

        const sum = array
            .map((el) => {
                return /^\d+$/.test(el) ? parseInt(el) : 0
            })
            .reduce((a, b) => {
                return a + b
            })

        sums.push(sum)
    })

    sums.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))

    return sums.slice(0, 3)
}

const groups = require('./input')
const largest3 = findLargest3(groups)
const result = findLargest3Sum(largest3)

console.log(result)

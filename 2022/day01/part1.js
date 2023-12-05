function findLargest(groups) {
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

    const largest = Math.max(...sums)

    return largest
}

const groups = require('./input')
const result = findLargest(groups)

console.log(result)

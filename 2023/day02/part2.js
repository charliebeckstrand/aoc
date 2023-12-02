const items = require('./input')

const getPowerOfRequiredCubes = (item) => {
    // Split the item so we can get the sets
    const sets = item
        .split(':')[1]
        .split(';')
        .map((set) =>
            set
                .trim()
                .split(', ')
                .map((group) => {
                    const [amount, color] = group.split(' ')
                    return { color, amount: parseInt(amount) }
                })
        )

    // get the minimum required cubes for each color
    const cubes = sets.reduce((acc, set) => {
        set.forEach((group) => {
            if (!acc[group.color] || acc[group.color] < group.amount) {
                acc[group.color] = group.amount
            }
        })

        return acc
    }, {})

    // return the power of the minimum required cubes
    return Object.values(cubes).reduce((acc, amount) => acc * amount, 1)
}

const result = items.map((item) => getPowerOfRequiredCubes(item)).reduce((acc, item) => acc + item, 0)

console.log(`result: ${result}`)

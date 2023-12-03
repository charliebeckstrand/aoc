const games = require('./input')

const getPowerOfCubes = (game) => {
    // split the game into an array of sets
    const sets = game
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

    // get the max amount of cubes of each color
    const cubes = sets.reduce((acc, set) => {
        set.forEach((group) => {
            if (!acc[group.color] || acc[group.color] < group.amount) {
                acc[group.color] = group.amount
            }
        })

        return acc
    }, {})

    // return the product of the cubes
    return Object.values(cubes).reduce((acc, amount) => acc * amount, 1)
}

const result = games.map((game) => getPowerOfCubes(game)).reduce((acc, game) => acc + game, 0)

console.log(result)

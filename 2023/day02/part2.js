const games = require('./input')

const getPowerOfCubes = (game) => {
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

    const cubes = sets.reduce((acc, set) => {
        set.forEach((group) => {
            if (!acc[group.color] || acc[group.color] < group.amount) {
                acc[group.color] = group.amount
            }
        })

        return acc
    }, {})

    return Object.values(cubes).reduce((acc, amount) => acc * amount, 1)
}

const result = games.map((game) => getPowerOfCubes(game)).reduce((acc, game) => acc + game, 0)

console.log(result)

const games = require('./input')

const getPossibleGames = (game) => {
    // available cubes of each color
    const availableCubes = { red: 12, green: 13, blue: 14 }

    // separate the game id and the draws
    const [id, draws] = game.replace('Game ', '').split(':')

    // split the game into an array of sets
    const sets = draws.split(';').map((set) =>
        set
            .trim()
            .split(', ')
            .map((group) => {
                const [amount, color] = group.split(' ')
                return { color, amount: parseInt(amount) }
            })
    )

    // check if the amount of cubes in each set is less than or equal to the limit
    return sets.every((set) =>
        Object.entries(availableCubes).every(
            ([color, limit]) =>
                set.filter((group) => group.color === color).reduce((acc, group) => acc + group.amount, 0) <= limit
        )
    )
        ? parseInt(id)
        : 0
}

const result = games.map((game) => getPossibleGames(game)).reduce((acc, game) => acc + game, 0)

console.log(`result: ${result}`)

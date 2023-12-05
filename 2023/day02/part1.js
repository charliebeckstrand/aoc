const games = require('./input')

const getPossibleGames = (game) => {
    const availableCubes = { red: 12, green: 13, blue: 14 }

    const [id, draws] = game.replace('Game ', '').split(':')

    const sets = draws.split(';').map((set) =>
        set
            .trim()
            .split(', ')
            .map((group) => {
                const [amount, color] = group.split(' ')
                return { color, amount: parseInt(amount) }
            })
    )

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

console.log(result)

const items = require('./input')

const findGames = (item) => {
    // Split the item into id and draws
    const [id, draws] = item.replace('Game ', '').split(':')

    // Split the draws into sets
    const sets = draws.split(';').map((set) =>
        set
            .trim()
            .split(', ')
            .map((group) => {
                const [amount, color] = group.split(' ')
                return { color, amount: parseInt(amount) }
            })
    )

    // Criteria for draws in a set to be possible
    const criteria = { red: 12, green: 13, blue: 14 }

    // Check if all sets meet the criteria
    return sets.every((set) =>
        Object.entries(criteria).every(
            ([color, limit]) =>
                set.filter((group) => group.color === color).reduce((acc, group) => acc + group.amount, 0) <= limit
        )
    )
        ? parseInt(id)
        : 0
}

const result = items.map((item) => findGames(item)).reduce((acc, item) => acc + item, 0)

console.log(`result: ${result}`)

const input = require('./input')

const processScratchcards = () => {
    const cards = input.map((card) => {
        const [winningNumbers, numbers] = card
            .substring(card.indexOf(':') + 1) // remove everything before the colon
            .replace(/\s\s+/g, ' ') // remove extra spaces
            .split('|') // split the string into winning numbers and numbers you have
            .map((part) => part.trim().split(' ').map(Number)) // return the winning numbers and numbers you have as arrays of numbers

        return { winningNumbers, numbers }
    })

    let totalCards = 0
    let cardCounts = new Array(cards.length).fill(1) // Start with 1 count for each card

    for (let i = 0; i < cards.length; i++) {
        const currentCount = cardCounts[i]

        totalCards += currentCount

        if (currentCount > 0) {
            const matchCount = cards[i].numbers.filter((number) => cards[i].winningNumbers.includes(number)).length

            for (let j = 1; j <= matchCount; j++) {
                const nextCardIndex = i + j

                if (nextCardIndex < cards.length) {
                    cardCounts[nextCardIndex] += currentCount
                }
            }
        }
    }

    return totalCards
}

const result = processScratchcards()

console.log(result)

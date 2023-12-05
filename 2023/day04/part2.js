const input = require('./input')

const processScratchcards = () => {
    const cards = input.map((card) => {
        const [winningNumbers, numbers] = card
            .substring(card.indexOf(':') + 1)
            .replace(/\s\s+/g, ' ')
            .split('|')
            .map((part) => part.trim().split(' ').map(Number))

        return { winningNumbers, numbers }
    })

    let totalCards = 0

    let cardCounts = new Array(cards.length).fill(1)

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

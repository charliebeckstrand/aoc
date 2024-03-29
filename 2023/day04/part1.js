const calculatePoints = (input) => {
    const cards = input.map((card) => {
        const [winningNumbers, numbers] = card
            .substring(card.indexOf(':') + 1)
            .replace(/\s\s+/g, ' ')
            .split('|')

        return {
            winningNumbers: winningNumbers.trim().split(' ').map(Number),
            numbersYouHave: numbers.trim().split(' ').map(Number)
        }
    })

    const points = cards.map((card) => {
        let cardPoints = 0

        const winningNumbers = card.numbersYouHave.filter((number) => {
            return card.winningNumbers.includes(number)
        })

        if (winningNumbers.length >= 1) {
            cardPoints = 1

            for (let i = 1; i < winningNumbers.length; i++) {
                cardPoints *= 2
            }
        }

        return cardPoints
    })

    const totalPoints = points.reduce((a, b) => a + b, 0)

    return totalPoints
}

const input = require('./input')
const result = calculatePoints(input)

console.log(result)

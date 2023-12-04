const input = require('./input')

const calculatePoints = () => {
    const cards = input.map((card) => {
        const [winningNumbers, numbers] = card
            .substring(card.indexOf(':') + 1) // remove everything before the colon
            .replace(/\s\s+/g, ' ') // remove extra spaces
            .split('|') // split the string into winning numbers and numbers you have

        // return the winning numbers and numbers you have as arrays of numbers
        return {
            winningNumbers: winningNumbers.trim().split(' ').map(Number),
            numbersYouHave: numbers.trim().split(' ').map(Number)
        }
    })

    const points = cards.map((card) => {
        let cardPoints = 0

        // find the winning numbers you have
        const winningNumbers = card.numbersYouHave.filter((number) => {
            return card.winningNumbers.includes(number)
        })

        if (winningNumbers.length >= 1) {
            // If you have at least one winning number, you get 1 point
            cardPoints = 1

            // For each additional winning number, double the points
            for (let i = 1; i < winningNumbers.length; i++) {
                cardPoints *= 2
            }
        }

        return cardPoints
    })

    // sum the points
    const totalPoints = points.reduce((a, b) => a + b, 0)

    return totalPoints
}

const result = calculatePoints()

console.log(result)

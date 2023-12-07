const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const handTypes = ['fiveOfAKind', 'fourOfAKind', 'fullHouse', 'threeOfAKind', 'twoPair', 'onePair', 'highCard']

const getCardStrength = (card) => cards.indexOf(card)

const getHandType = (hand) => {
    const handArray = hand.cards.map((card) => [card, getCardStrength(card)])

    handArray.sort((a, b) => b[1] - a[1])

    const cardCounts = handArray.reduce((counts, [_, strength]) => {
        counts[strength] = (counts[strength] || 0) + 1
        return counts
    }, {})

    const isFiveOfAKind = Object.values(cardCounts).includes(5)
    const isFourOfAKind = Object.values(cardCounts).includes(4)
    const isFullHouse = Object.values(cardCounts).includes(3) && Object.values(cardCounts).includes(2)
    const isThreeOfAKind = Object.values(cardCounts).includes(3)
    const pairCount = Object.values(cardCounts).filter((count) => count === 2).length

    if (isFiveOfAKind) return { type: 'fiveOfAKind', cards: handArray }
    if (isFourOfAKind) return { type: 'fourOfAKind', cards: handArray }
    if (isFullHouse) return { type: 'fullHouse', cards: handArray }
    if (isThreeOfAKind) return { type: 'threeOfAKind', cards: handArray }
    if (pairCount === 2) return { type: 'twoPair', cards: handArray }
    if (pairCount === 1) return { type: 'onePair', cards: handArray }

    return { type: 'highCard', cards: handArray }
}

const compareHands = (handA, handB) => {
    const typeA = getHandType(handA)
    const typeB = getHandType(handB)

    const typeIndexA = handTypes.indexOf(typeA.type)
    const typeIndexB = handTypes.indexOf(typeB.type)

    // compare hand types
    if (typeIndexA !== typeIndexB) {
        return typeIndexA < typeIndexB ? -1 : 1
    }

    // if hand types are the same, compare based on card strength
    for (let i = 0; i < handA.cards.length; i++) {
        const strengthA = getCardStrength(handA.cards[i])
        const strengthB = getCardStrength(handB.cards[i])

        if (strengthA !== strengthB) {
            return strengthA < strengthB ? -1 : 1
        }
    }

    return 0
}

const rankHands = (hands) => {
    const sortedHands = hands.sort(compareHands)

    sortedHands.forEach((hand, index) => {
        hand.rank = sortedHands.length - index
    })

    return sortedHands
}

const processInput = (input) => {
    const hands = input.split('\n')

    const sortedHands = hands.map((hand) => {
        const [cards, bid] = hand.split(' ')

        return {
            cards: cards.split(''),
            bid: Number(bid)
        }
    })

    const ranked = rankHands(sortedHands)

    return ranked
}

const input = require('./input')
const hands = processInput(input)
const total = hands.reduce((total, hand) => {
    return total + hand.bid * hand.rank
}, 0)

console.log(total)

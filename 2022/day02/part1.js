const rounds = require('./input')

const conditions = {
    tie: ['A X', 'B Y', 'C Z'],
    win: ['A Y', 'B Z', 'C X']
}

function getScore() {
    let score = 0

    rounds.forEach((round) => {
        if (round.includes('X')) {
            score++
        }
        if (round.includes('Y')) {
            score += 2
        }
        if (round.includes('Z')) {
            score += 3
        }

        if (conditions.tie.includes(round)) {
            score += 3
        }
        if (conditions.win.includes(round)) {
            score += 6
        }
    })

    return score
}

const result = getScore()

console.log(result)

import rounds from 'input.js'

const conditions = {
	'A X': 3, 'A Y': 4, 'A Z': 8,
	'B X': 1, 'B Y': 5, 'B Z': 9,
	'C X': 2, 'C Y': 6, 'C Z': 7,
}

function getScore () {
	let score = 0
	
	rounds.forEach((round, index) => {
		score += conditions[round]
	})
	
	console.log(`Score: ${score}`)
	
	return score
}

getScore()
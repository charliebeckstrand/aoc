const sections = require('./input')

function getOverlap () {
	let count = 0
	
	sections.forEach(section => {		
		const [range1, range2] = section.split(',').map(n => n.split('-').map(Number))
		const [range1start, range1end] = range1
		const [range2start, range2end] = range2
		
		if (
			range2end >= range1start 
			&& range2start <= range1end
		) {
			count++
		}
	})
		
	return count
}

const count = getOverlap()

console.log(count)
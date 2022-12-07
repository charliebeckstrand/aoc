const lines = require('./input')

function createDirectoryMap () {
	const map = {}
	const paths = []
	
	lines.forEach(line => {
		let currentDir = map
		
		if (/\d+\s\w+/.test(line)) {			
			const directoryPath = []
			
			const totalSize = Number(line.match(/\d+/)[0])
			
			paths.forEach(path => {
				directoryPath.push(path)
				
				const dirSize = map[directoryPath.join('/')] ?? 0
				
				map[directoryPath.join('/')] = dirSize + totalSize
			})
		} 
		else if (/\$ cd/.test(line)) {
			const [prefix, command, path] = line.split(' ')
			
			if (path == '..') { paths.pop() } 
			else { paths.push(path) }
		}
	})
		
	return map
}

function findSmallestDirectoryToRemove (directoryMap) {
	return Object.values(directoryMap).sort((a, b) => a - b).find((size) => 70000000 - directoryMap['/'] + size >= 30000000)
}

const directoryMap = createDirectoryMap()

console.log(findSmallestDirectoryToRemove(directoryMap))

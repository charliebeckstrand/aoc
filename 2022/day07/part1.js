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

function getTotalSize (directoryMap) {
	return Object.values(directoryMap).reduce((total, size) => (size <= 100000 ? total + size : total), 0)
}

const directoryMap = createDirectoryMap()

console.log(getTotalSize(directoryMap))

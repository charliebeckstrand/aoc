const lines = require('./input')

function createDirectoryMap () {
	const map = {}
	const paths = []
	
	lines.forEach(line => {		
		if (/\d+\s\w+/.test(line)) {						
			const totalSize = Number(line.match(/\d+/)[0])
			const currentDirPaths = []
			
			paths.forEach(path => {
				currentDirPaths.push(path)
				
				const dirSize = map[currentDirPaths.join('/')] ?? 0
				
				map[currentDirPaths.join('/')] = dirSize + totalSize
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

const directoryMap = createDirectoryMap()

console.log(getTotalSize(directoryMap))

function getTotalSize (directoryMap) {
	return Object.values(directoryMap).reduce((total, size) => (size <= 100000 ? total + size : total), 0)
}

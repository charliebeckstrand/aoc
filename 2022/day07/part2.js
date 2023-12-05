function createDirectoryMap(lines) {
    const map = {}
    const paths = []

    lines.forEach((line) => {
        if (/\d+\s\w+/.test(line)) {
            const totalSize = Number(line.match(/\d+/)[0])
            const currentDirPaths = []

            paths.forEach((path) => {
                currentDirPaths.push(path)

                const dirSize = map[currentDirPaths.join('/')] ?? 0

                map[currentDirPaths.join('/')] = dirSize + totalSize
            })
        } else if (/\$ cd/.test(line)) {
            const [prefix, command, path] = line.split(' ')

            if (path == '..') {
                paths.pop()
            } else {
                paths.push(path)
            }
        }
    })

    return map
}

function findSmallestDirectoryToRemove(directoryMap) {
    return Object.values(directoryMap)
        .sort((a, b) => a - b)
        .find((size) => 70000000 - directoryMap['/'] + size >= 30000000)
}

const lines = require('./input')
const directoryMap = createDirectoryMap(lines)
const result = findSmallestDirectoryToRemove(directoryMap)

console.log(result)

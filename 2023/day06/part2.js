const processInput = (input) => {
    const lines = input.split('\n')
    const time = lines[0].split(/\s+/).slice(1).join('')
    const distance = lines[1].split(/\s+/).slice(1).join('')

    return { time, distance }
}

const waysToBeatRecord = (raceTime, recordDistance) => {
    /*
        was able to initially solve using the same brute force function as part1.js 
        but got ChatGPT to suggest a solution using a quadratic equation
        which is much faster
    */

    // convert inputs to numbers
    raceTime = +raceTime
    recordDistance = +recordDistance

    // Quadratic equation: ax^2 + bx + c = 0
    let a = 1
    let b = -raceTime
    let c = -recordDistance

    // calculate discriminant
    let discriminant = b * b - 4 * a * c

    if (discriminant < 0) {
        // no real roots, no solution
        return 0
    }

    // calculate roots
    let root1 = Math.ceil((-b - Math.sqrt(discriminant)) / (2 * a))
    let root2 = Math.floor((-b + Math.sqrt(discriminant)) / (2 * a))

    // ensure roots are within valid range
    root1 = Math.max(0, Math.min(root1, raceTime))
    root2 = Math.max(0, Math.min(root2, raceTime))

    // count the number of valid holdTimes
    let count = Math.max(0, root2 - root1 + 1)

    return count
}

const input = require('./input')
const race = processInput(input)
const result = waysToBeatRecord(race.time, race.distance)

console.log(result)

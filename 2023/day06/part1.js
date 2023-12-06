const processInput = (input) => {
    const lines = input.split('\n')
    const times = lines[0].split(/\s+/).slice(1).map(Number)
    const distances = lines[1].split(/\s+/).slice(1).map(Number)

    return times.map((time, i) => {
        return {
            time,
            distance: distances[i]
        }
    })
}

const waysToBeatRecord = (raceTime, recordDistance) => {
    let count = 0
    let holdTime = 0

    while (holdTime < raceTime) {
        const [speed, travelTime] = [holdTime, raceTime - holdTime]
        const distance = speed * travelTime

        if (distance > recordDistance) {
            count++
        }

        holdTime++
    }

    return count
}

const input = require('./input')
const races = processInput(input)
const result = races.reduce((total, race) => {
    return total * waysToBeatRecord(race.time, race.distance)
}, 1)

console.log(result)

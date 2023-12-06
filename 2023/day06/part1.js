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

    for (let holdTime = 0; holdTime < raceTime; holdTime++) {
        let speed = holdTime
        let travelTime = raceTime - holdTime
        let distance = speed * travelTime

        if (distance > recordDistance) {
            count++
        }
    }

    return count
}

const findWinCons = (races) => {
    return races.reduce((total, race) => {
        return total * waysToBeatRecord(race.time, race.distance)
    }, 1)
}

const input = require('./input')
const races = processInput(input)
const result = findWinCons(races)

console.log(result)

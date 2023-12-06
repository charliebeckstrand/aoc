const processInput = (input) => {
    const lines = input.split('\n')
    const time = lines[0].split(/\s+/).slice(1).join('')
    const distance = lines[1].split(/\s+/).slice(1).join('')

    return {
        time: Number(time),
        distance: Number(distance)
    }
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

const input = require('./input')
const race = processInput(input)
const result = waysToBeatRecord(race.time, race.distance)

console.log(result)

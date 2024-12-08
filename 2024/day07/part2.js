import calibrations from './input.js'

const operators = ['+', '*', '||']

const generateOperatorCombinations = (n) => {
	return [...Array(n)].reduce(
		(accumulator, _) => {
			return accumulator.flatMap((sequence) => operators.map((operator) => [...sequence, operator]))
		},
		[[]]
	)
}

const operatorResolver = (operator) => {
	switch (operator) {
		case '+':
			return (a, b) => a + b
		case '*':
			return (a, b) => a * b
		case '||':
			return (a, b) => Number('' + a + b)
	}
}

const applyOperators = (numbers, operators) =>
	operators.reduce((result, operator, index) => {
		const operation = operatorResolver(operator)

		if (!operation) throw new Error(`Unknown operator: ${operator}`)

		return operation(result, numbers[index + 1])
	}, numbers[0])

const isValidCalibration = (target, numbers, generateOperatorCombinations, applyOperators) => {
	const operatorCombinations = generateOperatorCombinations(numbers.length - 1)

	return operatorCombinations.some((operators) => applyOperators(numbers, operators) === target)
}

const getTotal = (calibration) => {
	const [value] = calibration.split(':').map((str) => str.trim())

	return Number(value)
}

const parseNumbers = (calibration) => {
	const [, equations] = calibration.split(':').map((str) => str.trim())

	return equations.split(' ').map(Number)
}

const getCalibrationTotal = () =>
	calibrations.reduce((acc, calibration) => {
		const total = getTotal(calibration)
		const numbers = parseNumbers(calibration)

		const isValid = isValidCalibration(total, numbers, generateOperatorCombinations, applyOperators)

		return isValid ? acc + total : acc
	}, 0)

console.log(getCalibrationTotal())

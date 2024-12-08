import calibrations from './input.js'

const operators = ['+', '*', '||']

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

		return operation(result, numbers[index + 1])
	}, numbers[0])

const generateOperatorCombinations = (n) => {
	return [...Array(n)].reduce(
		(accumulator, _) => {
			return accumulator.flatMap((sequence) => operators.map((operator) => [...sequence, operator]))
		},
		[[]]
	)
}

const isValidCalibration = (target, numbers, generateOperatorCombinations, applyOperators) => {
	const operatorCombinations = generateOperatorCombinations(numbers.length - 1)

	return operatorCombinations.some((operators) => applyOperators(numbers, operators) === target)
}

const getTestValue = (calibration) => {
	const [value] = calibration.split(':').map((str) => str.trim())

	return Number(value)
}

const parseNumbers = (calibration) => {
	const [_, equations] = calibration.split(':').map((str) => str.trim())

	return equations.split(' ').map(Number)
}

const getCalibrationTotal = () =>
	calibrations.reduce((acc, calibration) => {
		const testValue = getTestValue(calibration)
		const numbers = parseNumbers(calibration)

		const isValid = isValidCalibration(testValue, numbers, generateOperatorCombinations, applyOperators)

		return isValid ? acc + testValue : acc
	}, 0)

console.log(getCalibrationTotal())

import { getMaxBattery } from './part-1'

export default (banks: string[]) => {
	let result = 0

	for (const bank of banks) {
		let batteries = Array.from(bank).map(Number)
		let batteriesLeftToTurnOn = 12

		while (batteriesLeftToTurnOn > 1) {
			const [maxValue, maxIndex] = getMaxBattery(batteries.slice(0, 1 - batteriesLeftToTurnOn))

			batteriesLeftToTurnOn -= 1
			batteries = batteries.slice(maxIndex + 1)

			result += maxValue * 10 ** batteriesLeftToTurnOn
		}

		const [lastMaxValue] = getMaxBattery(batteries)
		result += lastMaxValue
	}

	return result
}

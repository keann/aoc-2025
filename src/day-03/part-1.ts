export const getMaxBattery = (batteries: number[]) => {
	let maxIndex = 0

	for (let i = 1; i < batteries.length; i++) {
		if (batteries[i] > batteries[maxIndex]) {
			maxIndex = i
		}
	}

	return [batteries[maxIndex], maxIndex]
}

export default (banks: string[]) => {
	let result = 0

	for (const bank of banks) {
		const batteries = Array.from(bank).map(Number)
		const [firstMaxValue, firstMaxIndex] = getMaxBattery(batteries.slice(0, -1))
		const [secondMaxValue] = getMaxBattery(batteries.slice(firstMaxIndex + 1))

		result += firstMaxValue * 10 + secondMaxValue
	}

	return result
}

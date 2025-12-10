export default (_ranges: [number, number][]) => {
	const overlappingRanges = _ranges.sort((a, b) => a[0] - b[0])
	const normalizedRanges: [number, number][] = [overlappingRanges[0]]

	for (let i = 1; i < overlappingRanges.length; i++) {
		const range = overlappingRanges[i]
		const lastMerged = normalizedRanges[normalizedRanges.length - 1]

		if (range[0] <= lastMerged[1] + 1) {
			lastMerged[1] = Math.max(lastMerged[1], range[1])
		} else {
			normalizedRanges.push(range)
		}
	}

	return normalizedRanges.reduce((acc, range) => acc + range[1] - range[0] + 1, 0)
}

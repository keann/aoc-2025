export default (manifold: string[][]) => {
	let splitCount = 0
	let beams = new Set([manifold[0].indexOf('S')])

	for (let i = 1; i < manifold.length; i++) {
		beams = Array.from(beams).reduce((acc, beamIndex) => {
			const line = manifold[i]
			if (line[beamIndex] !== '^') {
				acc.add(beamIndex)
			} else {
				acc.add(beamIndex - 1)
				acc.add(beamIndex + 1)
				splitCount += 1
			}
			return acc
		}, new Set<number>())
	}

	return splitCount
}

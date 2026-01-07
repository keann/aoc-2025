const sendParticle = (manifold: string[][], lineIndex: number, beamIndex: number, timelines: number): number => {
	const line = manifold[lineIndex]

	if (line === undefined) return 1

	if (line[beamIndex] === '^') {
		return (
			sendParticle(manifold, lineIndex + 1, beamIndex - 1, timelines) +
			sendParticle(manifold, lineIndex + 1, beamIndex + 1, timelines)
		)
	}

	return sendParticle(manifold, lineIndex + 1, beamIndex, timelines)
}

export default (manifold: string[][]) => {
	return sendParticle(manifold, 1, manifold[0].indexOf('S'), 0)
}

// export default (manifold: string[][]) => {
// 	const splitCounts: number[] = []
// 	let beams = [manifold[0].indexOf('S')]

// 	for (let i = 1; i < manifold.length; i++) {
// 		beams = beams.values().reduce<number[]>((acc, beamIndex) => {
// 			const line = manifold[i]
// 			if (line[beamIndex] !== '^') {
// 				acc.push(beamIndex)
// 			} else {
// 				acc.push(beamIndex - 1)
// 				acc.push(beamIndex + 1)
// 			}
// 			return acc
// 		}, [])

// 		splitCounts.push(beams.length)
// 	}

// 	return splitCounts.reduce((acc, count) => acc + count, 0)
// }

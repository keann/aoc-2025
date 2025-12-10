const directions: [number, number][] = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

export const isRoll = (grid: string[][], x: number, y: number) => grid[y]?.[x] === '@'

export const isAccessibleRoll = (grid: string[][], x: number, y: number) => {
	if (!isRoll(grid, x, y)) return false

	let nearbyRollsCount = 0
	for (const [dx, dy] of directions) {
		if (isRoll(grid, x + dx, y + dy)) nearbyRollsCount += 1
		if (nearbyRollsCount === 4) return false
	}

	return true
}

export default (grid: string[][]) => {
	const height = grid.length
	const width = grid[0].length

	let accessibleRollsCount = 0
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (isAccessibleRoll(grid, x, y)) {
				accessibleRollsCount += 1
			}
		}
	}

	return accessibleRollsCount
}

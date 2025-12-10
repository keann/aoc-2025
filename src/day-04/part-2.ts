import { isAccessibleRoll, isRoll } from './part-1'

export default (_grid: string[][]) => {
	const grid = structuredClone(_grid)
	const height = grid.length
	const width = grid[0].length

	const rolls = new Map<string, [number, number]>()
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (isRoll(grid, x, y)) rolls.set(`${x},${y}`, [x, y])
		}
	}

	let totalAccessibleRollsCount = 0
	let currentlyAccessibleRollIds: string[] = []

	do {
		currentlyAccessibleRollIds.forEach(rollId => {
			const [x, y] = rolls.get(rollId)!
			grid[y][x] = '.'
			rolls.delete(rollId)
		})
		totalAccessibleRollsCount += currentlyAccessibleRollIds.length
		currentlyAccessibleRollIds = []

		for (const [rollId, [x, y]] of rolls.entries()) {
			if (isAccessibleRoll(grid, x, y)) currentlyAccessibleRollIds.push(rollId)
		}
	} while (currentlyAccessibleRollIds.length > 0)

	return totalAccessibleRollsCount
}

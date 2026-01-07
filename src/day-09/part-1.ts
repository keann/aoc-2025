export type Coords = [number, number]

export const getAreaSize = ([x1, y1]: Coords, [x2, y2]: Coords) => (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)

export default (tiles: Coords[]) => {
	let maxAreaSize = 0

	for (let i = 0; i < tiles.length; i++) {
		for (let j = i + 1; j < tiles.length; j++) {
			const areaSize = getAreaSize(tiles[i], tiles[j])
			if (areaSize > maxAreaSize) maxAreaSize = areaSize
		}
	}

	return maxAreaSize
}

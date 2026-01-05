import { type Coords, getSortedPairs, UnionFind } from './part-1'

export default (boxes: Coords[]) => {
	const pairs = getSortedPairs(boxes)
	const uf = new UnionFind(boxes.length)

	for (const [_, i, j] of pairs) {
		if (uf.union(i, j) === UnionFind.UnionStatus.FULLY_CONNECTED) {
			return boxes[i][0] * boxes[j][0]
		}
	}
}

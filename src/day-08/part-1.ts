export type Coords = [number, number, number]

export class UnionFind {
	static UnionStatus = {
		ALREADY_CONNECTED: 0,
		CONNECTED: 1,
		FULLY_CONNECTED: 2,
	} as const

	parent: number[]
	rank: number[]
	size: number[]
	circuitsCount: number

	constructor(n: number) {
		this.parent = Array.from({ length: n }, (_, i) => i)
		this.rank = new Array(n).fill(0)
		this.size = new Array(n).fill(1)
		this.circuitsCount = n
	}

	find(x: number): number {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x])
		}
		return this.parent[x]
	}

	union(x: number, y: number) {
		const rootX = this.find(x)
		const rootY = this.find(y)

		if (rootX === rootY) return UnionFind.UnionStatus.ALREADY_CONNECTED

		if (this.rank[rootX] < this.rank[rootY]) {
			this.parent[rootX] = rootY
			this.size[rootY] += this.size[rootX]
		} else if (this.rank[rootX] > this.rank[rootY]) {
			this.parent[rootY] = rootX
			this.size[rootX] += this.size[rootY]
		} else {
			this.parent[rootY] = rootX
			this.size[rootX] += this.size[rootY]
			this.rank[rootX]++
		}

		this.circuitsCount -= 1

		if (this.circuitsCount === 1) {
			return UnionFind.UnionStatus.FULLY_CONNECTED
		}

		return UnionFind.UnionStatus.CONNECTED
	}

	getSizes(): number[] {
		return this.size.filter((_, i) => this.parent[i] === i).sort((a, b) => b - a)
	}
}

const getRelativeDistance = (a: Coords, b: Coords): number => {
	const dx = a[0] - b[0]
	const dy = a[1] - b[1]
	const dz = a[2] - b[2]
	return dx * dx + dy * dy + dz * dz
}

export const getSortedPairs = (boxes: Coords[]) => {
	const n = boxes.length
	const pairs: [distance: number, i: number, j: number][] = []

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			pairs.push([getRelativeDistance(boxes[i], boxes[j]), i, j])
		}
	}

	return pairs.sort((a, b) => a[0] - b[0])
}

export default (boxes: Coords[], connectionsCount: number) => {
	const pairs = getSortedPairs(boxes)
	const uf = new UnionFind(boxes.length)
	let connected = 0

	for (const [_, i, j] of pairs) {
		uf.union(i, j)
		if (++connected >= connectionsCount) break
	}

	const sizes = uf.getSizes()
	return sizes[0] * sizes[1] * sizes[2]
}

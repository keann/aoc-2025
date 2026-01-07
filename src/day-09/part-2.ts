import { type Coords, getAreaSize } from './part-1'

class CompressedCoords {
	#xs: number[]
	#ys: number[]

	constructor(tiles: Coords[]) {
		this.#xs = this.#sort([...new Set(tiles.map(([x]) => x))])
		this.#ys = this.#sort([...new Set(tiles.map(([, y]) => y))])
	}

	get xSize() {
		return this.#xs.length
	}

	get ySize() {
		return this.#ys.length
	}

	getX(x1: number, x2: number) {
		return this.#sort([this.#xs.indexOf(x1) * 2, this.#xs.indexOf(x2) * 2])
	}

	getY(y1: number, y2: number) {
		return this.#sort([this.#ys.indexOf(y1) * 2, this.#ys.indexOf(y2) * 2])
	}

	#sort = (array: number[]) => array.sort((a, b) => a - b)
}

class Grid {
	#grid: number[][]

	constructor({ tiles, compressedCoords }: { tiles: Coords[]; compressedCoords: CompressedCoords }) {
		const grid = Array.from({ length: compressedCoords.xSize * 2 - 1 }, () =>
			new Array(compressedCoords.ySize * 2 - 1).fill(0),
		)

		for (let i = 0; i < tiles.length; i++) {
			const [x1, y1] = tiles[i]
			const [x2, y2] = tiles[(i + 1) % tiles.length]

			const [cx1, cx2] = compressedCoords.getX(x1, x2)
			const [cy1, cy2] = compressedCoords.getY(y1, y2)

			for (let cx = cx1; cx <= cx2; cx++) {
				for (let cy = cy1; cy <= cy2; cy++) {
					grid[cx][cy] = 1
				}
			}
		}

		this.#grid = grid
		this.#fillInnerArea()
	}

	get xSize() {
		return this.#grid.length
	}

	get ySize() {
		return this.#grid[0].length
	}

	get(x: number, y: number) {
		return this.#grid[x][y]
	}

	#fillInnerArea = () => {
		const { xSize, ySize } = this
		const queue: Coords[] = [[-1, -1]]
		const outside = new Set(['-1,-1'])

		const tileKey = (x: number, y: number) => `${x},${y}`

		while (queue.length > 0) {
			const [tx, ty] = queue.shift()!
			const directions = [
				[tx - 1, ty],
				[tx + 1, ty],
				[tx, ty - 1],
				[tx, ty + 1],
			] as const

			for (const [dx, dy] of directions) {
				if (dx < -1 || dy < -1 || dx > xSize || dy > ySize) continue
				if (dx >= 0 && dx < xSize && dy >= 0 && dy < ySize && this.#grid[dx][dy] === 1) continue

				const key = tileKey(dx, dy)
				if (outside.has(key)) continue

				outside.add(key)
				queue.push([dx, dy])
			}
		}

		for (let x = 0; x < xSize; x++) {
			for (let y = 0; y < ySize; y++) {
				if (!outside.has(tileKey(x, y))) this.#grid[x][y] = 1
			}
		}
	}

	print() {
		console.log('\n')
		console.log(this.#grid.map(row => row.join(' ')).join('\n'))
		console.log('\n')
	}
}

class PrefixSumGrid {
	#grid: number[][]

	constructor(source: Grid) {
		const { xSize, ySize } = source
		const grid = Array.from({ length: xSize }, () => new Array(ySize).fill(0))

		for (let x = 0; x < xSize; x++) {
			for (let y = 0; y < ySize; y++) {
				const left = x > 0 ? grid[x - 1][y] : 0
				const top = y > 0 ? grid[x][y - 1] : 0
				const topleft = x > 0 && y > 0 ? grid[x - 1][y - 1] : 0

				grid[x][y] = left + top - topleft + source.get(x, y)
			}
		}

		this.#grid = grid
	}

	isValidArea(x1: number, y1: number, x2: number, y2: number) {
		const left = x1 > 0 ? this.#grid[x1 - 1][y2] : 0
		const top = y1 > 0 ? this.#grid[x2][y1 - 1] : 0
		const topleft = x1 > 0 && y1 > 0 ? this.#grid[x1 - 1][y1 - 1] : 0

		const count = this.#grid[x2][y2] - left - top + topleft

		return count === (x2 - x1 + 1) * (y2 - y1 + 1)
	}
}

export default (tiles: Coords[]) => {
	const compressedCoords = new CompressedCoords(tiles)
	const grid = new Grid({ tiles, compressedCoords })
	const psg = new PrefixSumGrid(grid)

	let maxAreaSize = 0
	for (let i = 0; i < tiles.length; i++) {
		const [x1, y1] = tiles[i]

		for (let j = 0; j < i; j++) {
			const [x2, y2] = tiles[j]

			const [cx1, cx2] = compressedCoords.getX(x1, x2)
			const [cy1, cy2] = compressedCoords.getY(y1, y2)

			if (psg.isValidArea(cx1, cy1, cx2, cy2)) {
				const areaSize = getAreaSize(tiles[i], tiles[j])
				if (areaSize > maxAreaSize) maxAreaSize = areaSize
			}
		}
	}

	return maxAreaSize
}

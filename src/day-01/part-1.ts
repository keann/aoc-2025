export default ({ rotations, size, startPosition }: { rotations: string[]; size: number; startPosition: number }) => {
	let position = startPosition
	let count = 0

	for (const rotation of rotations) {
		const direction = rotation[0] === 'R' ? 1 : -1
		const offset = Number.parseInt(rotation.slice(1), 10) * direction

		position = (position + offset) % size

		if (position === 0) count += 1
	}

	return count
}

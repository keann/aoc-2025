export default ({ rotations, size, startPosition }: { rotations: string[]; size: number; startPosition: number }) => {
	let state = startPosition
	let pass = 0

	for (const rotation of rotations) {
		const direction = rotation[0] === 'R' ? 1 : -1
		const diff = Number.parseInt(rotation.slice(1), 10)

		pass += Math.floor(diff / size)

		const prevState = state

		state = state + ((diff * direction) % size)

		if (state <= 0 && prevState !== 0) pass += 1
		if (state >= size) pass += 1

		state = (state + size) % size
	}

	return pass
}

const isSequence = (id: string, chunkLength: number) => {
	if (id.length % chunkLength !== 0) return false

	const pattern = id.slice(0, chunkLength)

	for (let i = chunkLength; i < id.length; i += chunkLength) {
		const chunk = id.slice(i, i + chunkLength)
		if (chunk !== pattern) return false
	}

	return true
}

const isValidId = (id: number) => {
	const stringId = id.toString()
	const idLength = stringId.length

	for (let i = 1; i < idLength; i++) {
		if (isSequence(stringId, i)) return false
	}

	return true
}

export default (idRanges: Array<[number, number]>) => {
	let result = 0

	for (const [firstId, lastId] of idRanges) {
		for (let id = firstId; id <= lastId; id++) {
			if (!isValidId(id)) result += id
		}
	}

	return result
}

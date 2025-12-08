const isValidId = (id: number) => {
	const stringId = id.toString()
	const idLength = stringId.length

	return idLength % 2 !== 0 || stringId.slice(0, idLength / 2) !== stringId.slice(idLength / 2)
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

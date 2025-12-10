export default (ranges: [number, number][], ids: number[]) => {
	return ids.filter(id => ranges.some(range => id >= range[0] && id <= range[1])).length
}

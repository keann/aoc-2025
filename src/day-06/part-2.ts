export default ({ lengths, operators, values }: { lengths: number[]; operators: string[]; values: string[][] }) =>
	operators.reduce((result, operator, i) => {
		const args = Array.from({ length: lengths[i] }, (_, j) =>
			values.map(valueArray => valueArray[i]).map(value => value[j]),
		).map(arg => Number(arg.join('').trim()))

		switch (operator) {
			case '+':
				return result + args.reduce((acc, arg) => acc + arg, 0)
			case '*':
				return result + args.reduce((acc, arg) => acc * arg, 1)
			default:
				return result
		}
	}, 0)

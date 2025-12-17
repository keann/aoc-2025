export default ({ operators, values }: { operators: string[]; values: string[][] }) =>
	operators.reduce((result, operator, i) => {
		const args = Array.from({ length: values.length }, (_, j) => values[j][i].trim()).map(Number)

		switch (operator) {
			case '+':
				return result + args.reduce((acc, arg) => acc + arg, 0)
			case '*':
				return result + args.reduce((acc, arg) => acc * arg, 1)
			default:
				return result
		}
	}, 0)

import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-06/example.txt'
import inputData from '@data/day-06/input.txt'

import part1 from '@src/day-06/part-1'
import part2 from '@src/day-06/part-2'

const prepareData = (input: string) => {
	const data = input.split('\n')
	const operators = data[data.length - 1].match(/.\s+/g) ?? []
	const lengths: number[] = []

	for (let i = 0; i < operators.length; i++) {
		const isLast = i === operators.length - 1
		const length = operators[i].length - (isLast ? 0 : 1)
		lengths[i] = length
		operators[i] = operators[i].trim()
	}

	const values = data.slice(0, -1).map(line => {
		const result: string[] = []
		let i = 0

		lengths.forEach(length => {
			result.push(line.slice(i, i + length))
			i += length + 1
		})

		return result
	})

	return { lengths, operators, values }
}

describe('Day 6', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	test('example 1', () => {
		expect(part1(example)).toEqual(4277556)
	})

	test('input 1', () => {
		expect(part1(input)).toEqual(5667835681547)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(3263827)
	})

	test('input 2', () => {
		expect(part2(input)).toEqual(9434900032651)
	})
})

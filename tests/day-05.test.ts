import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-05/example.txt'
import inputData from '@data/day-05/input.txt'

import part1 from '@src/day-05/part-1'
import part2 from '@src/day-05/part-2'

const parseData = (input: string) => {
	const [rangesData, idsData] = input.split('\n\n')
	const ranges = rangesData.split('\n').map(range => range.split('-').map(Number) as [number, number])
	const ids = idsData.split('\n').map(Number)

	return { ranges, ids }
}

describe('Day 5', () => {
	const example = parseData(exampleData)
	const input = parseData(inputData)

	test('example 1', () => {
		expect(part1(example.ranges, example.ids)).toEqual(3)
	})

	test('input 1', () => {
		expect(part1(input.ranges, input.ids)).toEqual(865)
	})

	test('example 2', () => {
		expect(part2(example.ranges)).toEqual(14)
	})

	test('input 2', () => {
		expect(part2(input.ranges)).toEqual(352556672963116)
	})
})

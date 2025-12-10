import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-04/example.txt'
import inputData from '@data/day-04/input.txt'

import part1 from '@src/day-04/part-1'
import part2 from '@src/day-04/part-2'

const parseGrid = (input: string) => input.split('\n').map(line => line.split(''))

describe('Day 4', () => {
	const example = parseGrid(exampleData)
	const input = parseGrid(inputData)

	test('example 1', () => {
		expect(part1(example)).toEqual(13)
	})

	test('input 1', () => {
		expect(part1(input)).toEqual(1502)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(43)
	})

	test('input 2', () => {
		expect(part2(input)).toEqual(9083)
	})
})

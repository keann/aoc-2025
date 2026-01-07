import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-07/example.txt'
import inputData from '@data/day-07/input.txt'

import part1 from '@src/day-07/part-1'
import part2 from '@src/day-07/part-2'

const prepareData = (input: string) =>
	input
		.split('\n')
		.filter((_, index) => index % 2 === 0)
		.map(line => line.split(''))

describe('Day 7', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	test('example 1', () => {
		expect(part1(example)).toEqual(21)
	})

	test('input 1', () => {
		expect(part1(input)).toEqual(1675)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(40)
	})

	test.skip('input 2', () => {
		expect(part2(input)).toEqual(0)
	})
})

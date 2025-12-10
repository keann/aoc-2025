import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-03/example.txt'
import inputData from '@data/day-03/input.txt'

import part1 from '@src/day-03/part-1'
import part2 from '@src/day-03/part-2'

const prepareData = (input: string) => input.split('\n')

describe('Day 3', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	test('example 1', () => {
		expect(part1(example)).toEqual(357)
	})

	test('input 1', () => {
		expect(part1(input)).toEqual(17196)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(3121910778619)
	})

	test('input 2', () => {
		expect(part2(input)).toEqual(171039099596062)
	})
})

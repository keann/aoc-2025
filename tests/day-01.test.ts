import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-01/example.txt'
import inputData from '@data/day-01/input.txt'

import part1 from '@src/day-01/part-1'
import part2 from '@src/day-01/part-2'

const prepareData = (input: string) => input.split('\n').filter(Boolean)

describe('Day 1', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	const startPosition = 50
	const size = 100

	test('example 1', () => {
		expect(part1({ rotations: example, size, startPosition })).toEqual(3)
	})

	test('input 1', () => {
		expect(part1({ rotations: input, size, startPosition })).toEqual(1064)
	})

	test('example 2', () => {
		expect(part2({ rotations: example, size, startPosition })).toEqual(6)
	})

	test('input 2', () => {
		expect(part2({ rotations: input, size, startPosition })).toEqual(6122)
	})
})

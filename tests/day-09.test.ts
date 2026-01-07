import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-09/example.txt'
import inputData from '@data/day-09/input.txt'

import part1 from '@src/day-09/part-1'
import part2 from '@src/day-09/part-2'

const prepareData = (input: string) => input.split('\n').map(line => line.split(',').map(Number) as [number, number])

describe('Day 9', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	test('example 1', () => {
		expect(part1(example)).toEqual(50)
	})

	test('input 1', () => {
		expect(part1(input)).toEqual(4781377701)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(24)
	})

	test('input 2', () => {
		expect(part2(input)).toEqual(1470616992)
	})
})

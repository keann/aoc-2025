import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-08/example.txt'
import inputData from '@data/day-08/input.txt'

import part1 from '@src/day-08/part-1'
import part2 from '@src/day-08/part-2'

const prepareData = (input: string) =>
	input.split('\n').map(coords => coords.split(',').map(Number) as [number, number, number])

describe('Day 8', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	test('example 1', () => {
		expect(part1(example, 10)).toEqual(40)
	})

	test('input 1', () => {
		expect(part1(input, 1000)).toEqual(83520)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(25272)
	})

	test('input 2', () => {
		expect(part2(input)).toEqual(1131823407)
	})
})

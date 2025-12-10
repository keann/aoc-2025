import { describe, expect, test } from 'bun:test'

import exampleData from '@data/day-02/example.txt'
import inputData from '@data/day-02/input.txt'

import part1 from '@src/day-02/part-1'
import part2 from '@src/day-02/part-2'

const prepareData = (input: string) => input.split(',').map(range => range.split('-').map(Number) as [number, number])

describe('Day 2', () => {
	const example = prepareData(exampleData)
	const input = prepareData(inputData)

	test('example 1', () => {
		expect(part1(example)).toEqual(1227775554)
	})

	test('input 1', () => {
		expect(part1(input)).toEqual(18700015741)
	})

	test('example 2', () => {
		expect(part2(example)).toEqual(4174379265)
	})

	test('input 2', () => {
		expect(part2(input)).toEqual(20077272987)
	})
})

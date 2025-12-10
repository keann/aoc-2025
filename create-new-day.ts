import { readdirSync } from 'node:fs'
import Bun from 'bun'

const lastExistingDay = readdirSync('./src', { withFileTypes: true })
	.filter(entry => entry.isDirectory())
	.reduce(
		(acc, { name }) =>
			name.startsWith('day-') ? Math.max(acc, Number.parseInt(name.replace('day-', ''), 10)) : acc,
		1,
	)

const dayNumber = lastExistingDay + 1
const dayId = `day-${dayNumber.toString().padStart(2, '0')}`

/** Source */
const srcFileContent = `export default () => {}`
await Bun.write(`./src/${dayId}/part-1.ts`, srcFileContent)
await Bun.write(`./src/${dayId}/part-2.ts`, srcFileContent)

/** Fixtures */
await Bun.write(`./tests/fixtures/${dayId}/example.txt`, '')
await Bun.write(`./tests/fixtures/${dayId}/input.txt`, '')

/** Tests */
const testFileContent = `
import { describe, expect, test } from 'bun:test'

import exampleData from '@data/${dayId}/example.txt'
import inputData from '@data/${dayId}/input.txt'

import part1 from '@src/${dayId}/part-1'
import part2 from '@src/${dayId}/part-2'

const prepareData = (input: string) => {
    // ...
}

describe('Day ${dayNumber}', () => {
    const example = prepareData(exampleData)
    const input = prepareData(inputData)

    test('example 1', () => {
		expect(part1(example)).toEqual(undefined)
	})

	// test('input 1', () => {
	// 	expect(part1(input)).toEqual(undefined)
	// })

	// test('example 2', () => {
	// 	expect(part2(example)).toEqual(undefined)
	// })

	// test('input 2', () => {
	// 	expect(part2(input)).toEqual(undefined)
	// })
})`.trim()
await Bun.write(`./tests/${dayId}.test.ts`, testFileContent)

import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { createRandom } from '../../shared/random.js'
import { addTwoNumbers as digitByDigit } from './digit-by-digit.js'
import { addTwoNumbers as dummyHead } from './dummy-head.js'

const approaches = { 'digit by digit': digitByDigit, 'dummy head': dummyHead }
const lists = { prepare: ([a, b]) => [arrayToList(a), arrayToList(b)], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches(approaches, [
  { input: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
  { input: [[0], [0]], expected: [0] },
  { input: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
  { input: [[5], [5]], expected: [0, 1], label: 'a carry past the last digit' },
], lists)

it('agrees with BigInt on 500 random numbers', () => {
  const next = createRandom(102)
  // Least significant digit first; the last (most significant) digit is not 0, as on LeetCode.
  const digits = () => [...Array.from({ length: Math.floor(next() * 30) }, () => Math.floor(next() * 10)), 1 + Math.floor(next() * 9)]
  for (let round = 0; round < 500; round++) {
    const [a, b] = [digits(), digits()]
    const value = ds => BigInt([...ds].reverse().join(''))
    const expected = [...String(value(a) + value(b))].reverse().map(Number)
    for (const add of Object.values(approaches)) assert.deepEqual(listToArray(add(arrayToList(a), arrayToList(b))), expected)
  }
})

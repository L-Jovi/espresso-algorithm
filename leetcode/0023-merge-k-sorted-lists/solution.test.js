import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { createRandom, randomIntegers } from '../../shared/random.js'
import { mergeKLists as bruteForce } from './brute-force.js'
import { mergeKLists as divideAndConquer } from './divide-and-conquer.js'

const approaches = { 'brute force': bruteForce, 'divide and conquer': divideAndConquer }
const lists = { prepare: ([arrays]) => [arrays.map(arrayToList)], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches(approaches, [
  { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
  { input: [[]], expected: [], label: 'no lists' },
  { input: [[[]]], expected: [], label: 'one empty list' },
  { input: [[[], [2], [], [1, 3]]], expected: [1, 2, 3] },
], lists)

const byValue = (a, b) => a - b

it('both approaches agree with sorting all the values on 500 random inputs', () => {
  const next = createRandom(123)
  for (let seed = 1; seed <= 500; seed++) {
    const arrays = Array.from({ length: Math.floor(next() * 8) }, (_, i) =>
      randomIntegers(Math.floor(next() * 6), { min: -10, max: 10, seed: seed * 10 + i }).toSorted(byValue))
    for (const merge of Object.values(approaches)) {
      assert.deepEqual(listToArray(merge(arrays.map(arrayToList))), arrays.flat().toSorted(byValue))
    }
  }
})

it('handles LeetCode\'s largest case, 10,000 nodes, without overflowing the stack', () => {
  const arrays = Array.from({ length: 100 }, (_, i) => randomIntegers(100, { seed: i + 1 }).toSorted(byValue))
  for (const merge of Object.values(approaches)) {
    assert.deepEqual(listToArray(merge(arrays.map(arrayToList))), arrays.flat().toSorted(byValue))
  }
})

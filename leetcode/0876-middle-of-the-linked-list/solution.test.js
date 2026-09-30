import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { middleNode } from './fast-slow-pointers.js'

const lists = { prepare: ([array]) => [arrayToList(array)], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches({ 'fast and slow pointers': middleNode }, [
  { input: [[1, 2, 3, 4, 5]], expected: [3, 4, 5] },
  { input: [[1, 2, 3, 4, 5, 6]], expected: [4, 5, 6], label: 'even length: the second middle' },
  { input: [[1]], expected: [1] },
  { input: [[1, 2]], expected: [2] },
], lists)

it('returns node ⌊n / 2⌋ for every length from 1 to 50', () => {
  for (let n = 1; n <= 50; n++) {
    const array = Array.from({ length: n }, (_, i) => i)
    assert.equal(middleNode(arrayToList(array)).val, Math.floor(n / 2))
  }
})

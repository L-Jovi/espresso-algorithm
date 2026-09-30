import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { reverseKGroup as iteration } from './iteration.js'
import { reverseKGroup as recursion } from './recursion.js'

const approaches = { iteration, recursion }
const lists = { prepare: ([array, k]) => [arrayToList(array), k], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches(approaches, [
  { input: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
  { input: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
  { input: [[1, 2, 3, 4, 5], 1], expected: [1, 2, 3, 4, 5] },
  { input: [[1, 2, 3, 4, 5], 5], expected: [5, 4, 3, 2, 1] },
  { input: [[1, 2], 3], expected: [1, 2], label: 'shorter than k' },
  { input: [[], 2], expected: [] },
], lists)

// Reference: reverse each full chunk of k items in an array.
const reverseChunks = (array, k) =>
  array.flatMap((_, i) => (i % k === 0 ? (i + k <= array.length ? array.slice(i, i + k).reverse() : array.slice(i)) : []))

it('both approaches agree with reversing chunks of an array for every length up to 15 and k up to 6', () => {
  for (let n = 0; n <= 15; n++) {
    const array = Array.from({ length: n }, (_, i) => i)
    for (let k = 1; k <= 6; k++) {
      for (const reverse of Object.values(approaches)) {
        assert.deepEqual(listToArray(reverse(arrayToList(array), k)), reverseChunks(array, k), `n = ${n}, k = ${k}`)
      }
    }
  }
})

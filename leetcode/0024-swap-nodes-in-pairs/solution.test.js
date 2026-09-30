import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { swapPairs } from './recursion.js'

const lists = { prepare: ([array]) => [arrayToList(array)], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches({ recursion: swapPairs }, [
  { input: [[1, 2, 3, 4]], expected: [2, 1, 4, 3] },
  { input: [[]], expected: [] },
  { input: [[1]], expected: [1] },
  { input: [[1, 2, 3]], expected: [2, 1, 3], label: 'an odd length keeps the last node' },
], lists)

it('agrees with swapping neighbors in an array for every length up to 20', () => {
  for (let n = 0; n <= 20; n++) {
    const array = Array.from({ length: n }, (_, i) => i)
    const swapped = array.map((_, i) => (i % 2 === 0 ? (array[i + 1] ?? array[i]) : array[i - 1]))
    assert.deepEqual(listToArray(swapPairs(arrayToList(array))), swapped)
  }
})

it('moves the nodes themselves, not their values', () => {
  const head = arrayToList([1, 2])
  const [first, second] = [head, head.next]
  const swapped = swapPairs(head)
  assert.equal(swapped, second)
  assert.equal(swapped.next, first)
  assert.deepEqual([first.val, second.val], [1, 2])
})

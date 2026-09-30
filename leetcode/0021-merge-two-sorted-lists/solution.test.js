import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { randomIntegers } from '../../shared/random.js'
import { mergeTwoLists } from './recursion.js'

const lists = { prepare: ([a, b]) => [arrayToList(a), arrayToList(b)], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches({ recursion: mergeTwoLists }, [
  { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
  { input: [[], []], expected: [] },
  { input: [[], [0]], expected: [0] },
  { input: [[5], [1, 2, 3]], expected: [1, 2, 3, 5] },
], lists)

it('agrees with sorting the concatenation on 1,000 random pairs of lists', () => {
  const byValue = (a, b) => a - b
  for (let seed = 1; seed <= 1000; seed++) {
    const a = randomIntegers(seed % 13, { min: -20, max: 20, seed }).toSorted(byValue)
    const b = randomIntegers((seed * 5) % 17, { min: -20, max: 20, seed: seed + 5000 }).toSorted(byValue)
    assert.deepEqual(listToArray(mergeTwoLists(arrayToList(a), arrayToList(b))), [...a, ...b].toSorted(byValue))
  }
})

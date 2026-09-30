import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { removeDuplicates as splice } from './splice.js'
import { removeDuplicates as twoPointers } from './two-pointers.js'

// LeetCode checks the returned k and the first k items of the changed array.
const firstK = remove => nums => nums.slice(0, remove(nums))
const approaches = { splice: firstK(splice), 'two pointers': firstK(twoPointers) }

checkApproaches(approaches, [
  { input: [[1, 1, 2]], expected: [1, 2] },
  { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: [0, 1, 2, 3, 4] },
  { input: [[7]], expected: [7] },
  { input: [[5, 5, 5, 5]], expected: [5] },
  { input: [[]], expected: [], label: 'empty: k is 0' },
])

it('both approaches agree with a Set on 1,000 random sorted arrays', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const nums = randomIntegers(seed % 30, { min: -5, max: 5, seed }).toSorted((a, b) => a - b)
    for (const solve of Object.values(approaches)) assert.deepEqual(solve([...nums]), [...new Set(nums)])
  }
})

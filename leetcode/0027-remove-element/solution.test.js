import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { removeElement } from './two-pointers.js'

// LeetCode checks the returned k and the first k items of the changed array.
const approaches = { 'two pointers': (nums, val) => nums.slice(0, removeElement(nums, val)) }

checkApproaches(approaches, [
  { input: [[3, 2, 2, 3], 3], expected: [2, 2] },
  { input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: [0, 1, 3, 0, 4] },
  { input: [[1], 1], expected: [] },
  { input: [[], 0], expected: [] },
  { input: [[4, 5], 6], expected: [4, 5], label: 'nothing to remove' },
])

it('agrees with filter on 1,000 random arrays', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const nums = randomIntegers(seed % 25, { min: 0, max: 4, seed })
    const val = seed % 5
    assert.deepEqual(approaches['two pointers']([...nums], val), nums.filter(x => x !== val))
  }
})

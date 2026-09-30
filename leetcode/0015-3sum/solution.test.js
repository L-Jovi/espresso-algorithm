import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { threeSum } from './two-pointers.js'

// Any order of the triples, and of the numbers inside each, is a correct answer.
const canonical = triples => triples.map(t => t.toSorted((a, b) => a - b)).toSorted((a, b) => a[0] - b[0] || a[1] - b[1])
const anyOrder = { check: (actual, expected) => assert.deepEqual(canonical(actual), canonical(expected)) }

checkApproaches({ 'two pointers': threeSum }, [
  { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
  { input: [[0, 1, 1]], expected: [] },
  { input: [[0, 0, 0, 0]], expected: [[0, 0, 0]] },
  { input: [[-2, 0, 1, 1, 2]], expected: [[-2, 0, 2], [-2, 1, 1]] },
  { input: [[]], expected: [] },
], anyOrder)

// Reference: try every triple of positions and keep the distinct ones.
function threeSumOfAllTriples(nums) {
  const found = new Map()
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const triple = [nums[i], nums[j], nums[k]].toSorted((a, b) => a - b)
        if (nums[i] + nums[j] + nums[k] === 0) found.set(String(triple), triple)
      }
    }
  }
  return [...found.values()]
}

it('agrees with trying every triple on 1,000 random arrays, and leaves the input alone', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const nums = randomIntegers(seed % 15, { min: -6, max: 6, seed })
    const copy = [...nums]
    assert.deepEqual(canonical(threeSum(nums)), canonical(threeSumOfAllTriples(nums)), String(nums))
    assert.deepEqual(nums, copy)
  }
})

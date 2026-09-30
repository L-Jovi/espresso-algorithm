import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { maxSubArray as bruteForce } from './brute-force.js'
import { maxSubArray as spaceOptimized } from './space-optimized.js'
import { maxSubArray as tabulation } from './tabulation.js'

const approaches = { 'brute force': bruteForce, tabulation, 'space-optimized': spaceOptimized }

checkApproaches(approaches, [
  { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
  { input: [[1]], expected: 1 },
  { input: [[5, 4, -1, 7, 8]], expected: 23 },
  { input: [[-1]], expected: -1 },
  { input: [[-3, -1, -2]], expected: -1, label: 'every number negative' },
  { input: [[0]], expected: 0 },
])

// Reference: add up every subarray from scratch.
function maxOfAllSums(nums) {
  let best = -Infinity
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let sum = 0
      for (let k = i; k <= j; k++) sum += nums[k]
      best = Math.max(best, sum)
    }
  }
  return best
}

it('all three agree with adding up every subarray on 1,000 random arrays', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const nums = randomIntegers(1 + (seed % 20), { min: -10, max: 10, seed })
    const expected = maxOfAllSums(nums)
    for (const solve of Object.values(approaches)) assert.equal(solve(nums), expected, String(nums))
  }
})

it('the linear approaches handle LeetCode\'s largest input, 100,000 numbers', () => {
  const nums = randomIntegers(100_000, { min: -10_000, max: 10_000, seed: 53 })
  assert.equal(tabulation(nums), spaceOptimized(nums))
})

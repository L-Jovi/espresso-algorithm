import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { twoSum as bruteForce } from './brute-force.js'
import { twoSum as hashMap } from './hash-map.js'

const approaches = { 'brute force': bruteForce, 'hash map': hashMap }

checkApproaches(approaches, [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 2, 4], 6], expected: [1, 2] },
  { input: [[3, 3], 6], expected: [0, 1] },
  { input: [[-3, 4, 3, 90], 0], expected: [0, 2] },
  { input: [[1, 2], 7], expected: [], label: 'no pair' },
])

it('both approaches return a valid pair on 1,000 random arrays', () => {
  const next = createRandom(101)
  for (let round = 0; round < 1000; round++) {
    const nums = Array.from({ length: 2 + Math.floor(next() * 20) }, () => Math.floor(next() * 21) - 10)
    const target = nums[0] + nums[1 + Math.floor(next() * (nums.length - 1))]
    for (const twoSum of Object.values(approaches)) {
      const [i, j] = twoSum(nums, target)
      assert.ok(i < j && nums[i] + nums[j] === target)
    }
  }
})

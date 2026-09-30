import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom, randomIntegers } from '../../shared/random.js'
import { threeSumClosest } from './two-pointers.js'

checkApproaches({ 'two pointers': threeSumClosest }, [
  { input: [[-1, 2, 1, -4], 1], expected: 2 },
  { input: [[0, 0, 0], 1], expected: 0 },
  { input: [[1, 1, 1, 0], 100], expected: 3 },
  { input: [[4, 0, 5, -5, 3, 3, 0, -4, -5], -2], expected: -2, label: 'an exact hit' },
])

// Reference: every sum of three positions. Two sums can be equally close
// (LeetCode's inputs avoid this), so the test compares distances.
function sumsOfAllTriples(nums) {
  const sums = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) sums.push(nums[i] + nums[j] + nums[k])
    }
  }
  return sums
}

it('finds a closest sum on 1,000 random arrays, and leaves the input alone', () => {
  const next = createRandom(116)
  for (let seed = 1; seed <= 1000; seed++) {
    const nums = randomIntegers(3 + (seed % 12), { min: -20, max: 20, seed })
    const copy = [...nums]
    const target = Math.floor(next() * 81) - 40
    const sums = sumsOfAllTriples(nums)
    const answer = threeSumClosest(nums, target)
    assert.ok(sums.includes(answer), `${answer} is not a sum of three items`)
    assert.equal(Math.abs(answer - target), Math.min(...sums.map(sum => Math.abs(sum - target))), `${nums} → ${target}`)
    assert.deepEqual(nums, copy)
  }
})

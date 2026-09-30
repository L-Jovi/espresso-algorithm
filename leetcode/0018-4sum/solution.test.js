import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom, randomIntegers } from '../../shared/random.js'
import { fourSum } from './two-pointers.js'

const canonical = groups => groups.map(g => g.toSorted((a, b) => a - b)).toSorted((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2])
const anyOrder = { check: (actual, expected) => assert.deepEqual(canonical(actual), canonical(expected)) }

checkApproaches({ 'two pointers': fourSum }, [
  { input: [[1, 0, -1, 0, -2, 2], 0], expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
  { input: [[2, 2, 2, 2, 2], 8], expected: [[2, 2, 2, 2]] },
  { input: [[], 0], expected: [] },
  { input: [[1e9, 1e9, 1e9, 1e9], -294967296], expected: [], label: 'no 32-bit wraparound' },
], anyOrder)

// Reference: try every group of four positions and keep the distinct ones.
function fourSumOfAllGroups(nums, target) {
  const found = new Map()
  const n = nums.length
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      for (let c = b + 1; c < n; c++) {
        for (let d = c + 1; d < n; d++) {
          const group = [nums[a], nums[b], nums[c], nums[d]].toSorted((x, y) => x - y)
          if (nums[a] + nums[b] + nums[c] + nums[d] === target) found.set(String(group), group)
        }
      }
    }
  }
  return [...found.values()]
}

it('agrees with trying every group of four on 500 random arrays, and leaves the input alone', () => {
  const next = createRandom(118)
  for (let seed = 1; seed <= 500; seed++) {
    const nums = randomIntegers(seed % 12, { min: -5, max: 5, seed })
    const copy = [...nums]
    const target = Math.floor(next() * 11) - 5
    assert.deepEqual(canonical(fourSum(nums, target)), canonical(fourSumOfAllGroups(nums, target)), `${nums} → ${target}`)
    assert.deepEqual(nums, copy)
  }
})

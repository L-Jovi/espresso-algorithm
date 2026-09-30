import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { maxArea } from './two-pointers.js'

checkApproaches({ 'two pointers': maxArea }, [
  { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
  { input: [[1, 1]], expected: 1 },
  { input: [[4, 3, 2, 1, 4]], expected: 16 },
  { input: [[1, 2, 1]], expected: 2 },
  { input: [[0, 0]], expected: 0 },
])

// Reference: try every pair.
function maxAreaOfAllPairs(height) {
  let best = 0
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) best = Math.max(best, Math.min(height[i], height[j]) * (j - i))
  }
  return best
}

it('agrees with trying every pair on 1,000 random inputs', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const height = randomIntegers(2 + (seed % 40), { min: 0, max: 20, seed })
    assert.equal(maxArea(height), maxAreaOfAllPairs(height), String(height))
  }
})

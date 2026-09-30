import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { maxProfit as bruteForce } from './brute-force.js'
import { maxProfit as spaceOptimized } from './space-optimized.js'
import { maxProfit as tabulation } from './tabulation.js'

const approaches = { 'brute force': bruteForce, tabulation, 'space-optimized': spaceOptimized }

checkApproaches(approaches, [
  { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
  { input: [[7, 6, 4, 3, 1]], expected: 0, label: 'falling prices: no trade' },
  { input: [[1, 5]], expected: 4, label: 'buying on day 0' },
  { input: [[3]], expected: 0 },
  { input: [[2, 4, 1]], expected: 2, label: 'the lowest price comes too late' },
])

it('all three agree with trying every pair of days on 1,000 random price lists', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const prices = randomIntegers(1 + (seed % 30), { min: 0, max: 20, seed })
    const expected = bruteForce(prices)
    assert.equal(tabulation(prices), expected, String(prices))
    assert.equal(spaceOptimized(prices), expected, String(prices))
  }
})

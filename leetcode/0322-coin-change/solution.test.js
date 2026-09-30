import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { coinChange as bruteForce } from './brute-force.js'
import { coinChange as memoization } from './memoization.js'
import { coinChange as tabulation } from './tabulation.js'

const approaches = { 'brute force': bruteForce, memoization, tabulation }

checkApproaches(approaches, [
  { input: [[1, 2, 5], 11], expected: 3 },
  { input: [[2], 3], expected: -1 },
  { input: [[1], 0], expected: 0 },
  { input: [[2, 5, 10, 1], 27], expected: 4 },
  { input: [[4, 3], 6], expected: 2, label: 'the largest coin first would fail' },
])

it('all three agree on 500 random coin sets', () => {
  const next = createRandom(322)
  for (let round = 0; round < 500; round++) {
    const coins = [...new Set(Array.from({ length: 1 + Math.floor(next() * 3) }, () => 2 + Math.floor(next() * 6)))]
    const amount = Math.floor(next() * 20)
    const expected = bruteForce(coins, amount)
    assert.equal(memoization(coins, amount), expected, `${coins} → ${amount}`)
    assert.equal(tabulation(coins, amount), expected, `${coins} → ${amount}`)
  }
})

it('tabulation handles LeetCode\'s largest amount, 10,000, even with coins [1]', () => {
  assert.equal(tabulation([1], 10_000), 10_000)
  assert.equal(tabulation([186, 419, 83, 408], 6249), 20)
})

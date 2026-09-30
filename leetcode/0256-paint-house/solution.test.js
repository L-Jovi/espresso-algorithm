import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { minCost as bruteForce } from './brute-force.js'
import { minCost as memoization } from './memoization.js'
import { minCost as tabulation } from './tabulation.js'

const approaches = { 'brute force': bruteForce, memoization, tabulation }

checkApproaches(approaches, [
  { input: [[[17, 2, 17], [16, 16, 5], [14, 3, 19]]], expected: 10 },
  { input: [[[7, 6, 2]]], expected: 2 },
  { input: [[[1, 5, 3], [2, 9, 4]]], expected: 5 },
  { input: [[]], expected: 0 },
])

const randomCosts = (next, houses) => Array.from({ length: houses }, () => Array.from({ length: 3 }, () => Math.floor(next() * 20)))

it('all three agree on 500 random rows of houses, and leave the costs alone', () => {
  const next = createRandom(256)
  for (let round = 0; round < 500; round++) {
    const costs = randomCosts(next, 1 + Math.floor(next() * 10))
    const copy = structuredClone(costs)
    const expected = bruteForce(costs)
    assert.equal(memoization(costs), expected)
    assert.equal(tabulation(costs), expected)
    assert.deepEqual(costs, copy)
  }
})

it('memoization and tabulation agree on 100 houses, far too many for brute force', () => {
  const costs = randomCosts(createRandom(2560), 100)
  assert.equal(memoization(costs), tabulation(costs))
})

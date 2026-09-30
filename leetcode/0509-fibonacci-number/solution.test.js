import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { fib as fastDoubling } from './fast-doubling.js'
import { fib as memoization } from './memoization.js'
import { fib as recursion } from './recursion.js'
import { fib as spaceOptimized } from './space-optimized.js'
import { fib as tabulation } from './tabulation.js'

const approaches = { recursion, memoization, tabulation, 'space-optimized': spaceOptimized, 'fast doubling': fastDoubling }

checkApproaches(approaches, [
  { input: [0], expected: 0 },
  { input: [1], expected: 1 },
  { input: [2], expected: 1 },
  { input: [3], expected: 2 },
  { input: [4], expected: 3 },
  { input: [10], expected: 55 },
  { input: [30], expected: 832040, label: 'LeetCode\'s largest n' },
])

it('the four fast approaches are exact up to F(78), the largest below 2^53', () => {
  let previous = 0n // F(n), exact as a BigInt
  let current = 1n // F(n + 1)
  for (let n = 0; n <= 78; n++) {
    for (const [name, fib] of Object.entries(approaches)) {
      if (name !== 'recursion') assert.equal(BigInt(fib(n)), previous, `${name}(${n})`)
    }
    const sum = previous + current
    previous = current
    current = sum
  }
  assert.equal(fastDoubling(78), 8944394323791464)
})

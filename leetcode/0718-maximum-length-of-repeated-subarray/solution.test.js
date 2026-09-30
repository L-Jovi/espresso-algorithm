import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { randomIntegers } from '../../shared/random.js'
import { findLength } from './tabulation.js'

checkApproaches({ tabulation: findLength }, [
  { input: [[1, 2, 3, 2, 1], [3, 2, 1, 4, 7]], expected: 3 },
  { input: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], expected: 5 },
  { input: [[1, 2], [3, 4]], expected: 0 },
  { input: [[1, 2, 3], [1, 9, 2, 3]], expected: 2, label: 'a gap breaks the run' },
])

// Reference: from every pair of start positions, count how far both arrays agree.
function longestByTryingEveryStart(a, b) {
  let longest = 0
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let length = 0
      while (i + length < a.length && j + length < b.length && a[i + length] === b[j + length]) length++
      longest = Math.max(longest, length)
    }
  }
  return longest
}

it('agrees with trying every pair of start positions on 1,000 random pairs', () => {
  for (let seed = 1; seed <= 1000; seed++) {
    const a = randomIntegers(1 + (seed % 15), { min: 0, max: 3, seed })
    const b = randomIntegers(1 + ((seed * 7) % 15), { min: 0, max: 3, seed: seed + 5000 })
    assert.equal(findLength(a, b), longestByTryingEveryStart(a, b), `${a} / ${b}`)
  }
})

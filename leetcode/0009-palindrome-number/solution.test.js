import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { isPalindrome } from './digit-math.js'

checkApproaches({ 'digit math': isPalindrome }, [
  { input: [121], expected: true },
  { input: [-121], expected: false },
  { input: [10], expected: false },
  { input: [0], expected: true },
  { input: [1221], expected: true },
  { input: [1000000001], expected: true },
  { input: [2 ** 31 - 1], expected: false },
])

it('agrees with reversing the digits as a string on 20,000 random integers', () => {
  const next = createRandom(109)
  for (let round = 0; round < 20_000; round++) {
    // Mostly short numbers, where palindromes are common.
    const x = Math.floor(next() * 10 ** (1 + Math.floor(next() * 9))) * (next() < 0.1 ? -1 : 1)
    assert.equal(isPalindrome(x), String(x) === [...String(x)].reverse().join(''), String(x))
  }
})

import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { longestCommonSubsequence as bruteForce } from './brute-force.js'
import { longestCommonSubsequence as memoization } from './memoization.js'
import { longestCommonSubsequence as tabulation } from './tabulation.js'

const approaches = { 'brute force': bruteForce, memoization, tabulation }

checkApproaches(approaches, [
  { input: ['abcde', 'ace'], expected: 3 },
  { input: ['abc', 'abc'], expected: 3 },
  { input: ['abc', 'def'], expected: 0 },
  { input: ['', 'abc'], expected: 0 },
  { input: ['bsbininm', 'jmjkbkjkv'], expected: 1 },
])

// Reference: try every subsequence of the shorter string, longest first.
function lcsByTryingSubsequences(a, b) {
  const isSubsequence = (small, big) => {
    let i = 0
    for (const char of big) if (char === small[i]) i++
    return i === small.length
  }
  const [short, long] = a.length <= b.length ? [a, b] : [b, a]
  let best = 0
  for (let mask = 0; mask < 2 ** short.length; mask++) {
    const picked = [...short].filter((_, i) => mask & (1 << i)).join('')
    if (picked.length > best && isSubsequence(picked, long)) best = picked.length
  }
  return best
}

it('all three agree with trying every subsequence on 500 random pairs', () => {
  const next = createRandom(1143)
  const text = () => Array.from({ length: Math.floor(next() * 9) }, () => 'abc'[Math.floor(next() * 3)]).join('')
  for (let round = 0; round < 500; round++) {
    const [a, b] = [text(), text()]
    const expected = lcsByTryingSubsequences(a, b)
    for (const solve of Object.values(approaches)) assert.equal(solve(a, b), expected, `${a} / ${b}`)
  }
})

it('memoization and tabulation handle LeetCode\'s longest strings, 1,000 characters each', () => {
  const next = createRandom(11430)
  const text = () => Array.from({ length: 1000 }, () => 'abcd'[Math.floor(next() * 4)]).join('')
  const [a, b] = [text(), text()]
  assert.equal(memoization(a, b), tabulation(a, b))
})

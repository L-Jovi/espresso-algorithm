import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { longestPalindrome as expandAroundCenter } from './expand-around-center.js'
import { longestPalindrome as tabulation } from './tabulation.js'

const approaches = { tabulation, 'expand around center': expandAroundCenter }
const isPalindrome = s => s === [...s].reverse().join('')

// Several answers can be correct ("bab" or "aba"), so check the length and the shape.
checkApproaches(approaches, [
  { input: ['babad'], expected: 3 },
  { input: ['cbbd'], expected: 2 },
  { input: ['a'], expected: 1 },
  { input: [''], expected: 0 },
  { input: ['forgeeksskeegfor'], expected: 10 },
], { check: (actual, expected, [s]) => assert.ok(actual.length === expected && isPalindrome(actual) && s.includes(actual)) })

it('both approaches find a longest palindrome on 1,000 random strings', () => {
  const next = createRandom(105)
  for (let round = 0; round < 1000; round++) {
    const s = Array.from({ length: Math.floor(next() * 25) }, () => 'ab'[Math.floor(next() * 2)]).join('')
    let longest = 0
    for (let i = 0; i < s.length; i++) for (let j = i; j < s.length; j++) if (isPalindrome(s.slice(i, j + 1))) longest = Math.max(longest, j - i + 1)
    for (const solve of Object.values(approaches)) {
      const answer = solve(s)
      assert.ok(answer.length === longest && isPalindrome(answer) && s.includes(answer), s)
    }
  }
})

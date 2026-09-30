import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { lengthOfLongestSubstring as slidingWindow } from './sliding-window.js'

checkApproaches({ 'sliding window': slidingWindow }, [
  { input: ['abcabcbb'], expected: 3 },
  { input: ['bbbbb'], expected: 1 },
  { input: ['pwwkew'], expected: 3 },
  { input: [''], expected: 0 },
  { input: ['abba'], expected: 2, label: 'start must never move backwards' },
  { input: ['constructor'], expected: 7, label: 'a word that is also an object key' },
])

it('agrees with brute force on 2,000 random strings', () => {
  const next = createRandom(103)
  const bruteForce = s => {
    let best = 0
    for (let i = 0; i < s.length; i++) {
      const seen = new Set()
      for (let j = i; j < s.length && !seen.has(s[j]); j++) seen.add(s[j])
      best = Math.max(best, seen.size)
    }
    return best
  }
  for (let round = 0; round < 2000; round++) {
    const s = Array.from({ length: Math.floor(next() * 20) }, () => 'abcd'[Math.floor(next() * 4)]).join('')
    assert.equal(slidingWindow(s), bruteForce(s), s)
  }
})

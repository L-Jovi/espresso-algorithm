import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { maxFreq } from './sliding-window.js'

checkApproaches({ 'sliding window': maxFreq }, [
  { input: ['aababcaab', 2, 3, 4], expected: 2 },
  { input: ['aaaa', 1, 3, 3], expected: 2, label: 'overlapping occurrences count' },
  { input: ['aabcabcab', 2, 2, 3], expected: 3 },
  { input: ['abcde', 2, 3, 3], expected: 0 },
  { input: ['constructorconstructor', 7, 11, 11], expected: 2, label: 'a window named like an Object.prototype property' },
])

// Reference: count the valid substrings of every allowed length.
function maxFreqOfAllLengths(s, maxLetters, minSize, maxSize) {
  const counts = new Map()
  for (let length = minSize; length <= maxSize; length++) {
    for (let start = 0; start + length <= s.length; start++) {
      const piece = s.slice(start, start + length)
      if (new Set(piece).size <= maxLetters) counts.set(piece, (counts.get(piece) ?? 0) + 1)
    }
  }
  return Math.max(0, ...counts.values())
}

it('agrees with counting every allowed length on 1,000 random strings', () => {
  const next = createRandom(1297)
  for (let round = 0; round < 1000; round++) {
    const s = Array.from({ length: 1 + Math.floor(next() * 15) }, () => 'abc'[Math.floor(next() * 3)]).join('')
    const minSize = 1 + Math.floor(next() * 3)
    const maxSize = minSize + Math.floor(next() * 3)
    const maxLetters = 1 + Math.floor(next() * 3)
    assert.equal(maxFreq(s, maxLetters, minSize, maxSize), maxFreqOfAllLengths(s, maxLetters, minSize, maxSize), `${s} ${maxLetters} ${minSize} ${maxSize}`)
  }
})

import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { longestCommonPrefix } from './horizontal-scan.js'

checkApproaches({ 'horizontal scan': longestCommonPrefix }, [
  { input: [['flower', 'flow', 'flight']], expected: 'fl' },
  { input: [['dog', 'racecar', 'car']], expected: '' },
  { input: [['ab', 'a']], expected: 'a' },
  { input: [['a']], expected: 'a' },
  { input: [['']], expected: '' },
  { input: [[]], expected: '' },
])

// Reference: after sorting, the first and last words differ the most, so
// their common prefix is everyone's.
function prefixOfExtremes(strs) {
  if (strs.length === 0) return ''
  const sorted = strs.toSorted()
  const [first, last] = [sorted[0], sorted.at(-1)]
  let length = 0
  while (length < first.length && first[length] === last[length]) length++
  return first.slice(0, length)
}

it('agrees with comparing the first and last word in sorted order on 2,000 random lists', () => {
  const next = createRandom(114)
  for (let round = 0; round < 2000; round++) {
    const strs = Array.from({ length: Math.floor(next() * 5) }, () =>
      Array.from({ length: Math.floor(next() * 5) }, () => 'ab'[Math.floor(next() * 2)]).join(''))
    assert.equal(longestCommonPrefix(strs), prefixOfExtremes(strs), JSON.stringify(strs))
  }
})

import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { findSubstring } from './per-index-count.js'

checkApproaches({ 'count per start position': findSubstring }, [
  { input: ['barfoothefoobarman', ['foo', 'bar']], expected: [0, 9] },
  { input: ['wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']], expected: [] },
  { input: ['barfoofoobarthefoobarman', ['bar', 'foo', 'the']], expected: [6, 9, 12] },
  { input: ['aaa', ['a', 'a']], expected: [0, 1] },
  { input: ['constructor', ['constructor']], expected: [0], label: 'a word that is an Object.prototype name' },
  { input: ['toStringtoString', ['toString', 'toString']], expected: [0] },
  { input: ['ab', ['abc']], expected: [], label: 'words longer than s' },
])

// Reference: a window matches when its pieces, sorted, equal the words, sorted.
function findBySortingPieces(s, words) {
  const w = words[0].length
  const target = String(words.toSorted())
  const starts = []
  for (let start = 0; start + w * words.length <= s.length; start++) {
    const pieces = words.map((_, i) => s.slice(start + i * w, start + (i + 1) * w))
    if (String(pieces.toSorted()) === target) starts.push(start)
  }
  return starts
}

it('agrees with sorting the pieces of every window on 2,000 random inputs', () => {
  const next = createRandom(130)
  const text = length => Array.from({ length }, () => 'ab'[Math.floor(next() * 2)]).join('')
  for (let round = 0; round < 2000; round++) {
    const w = 1 + Math.floor(next() * 2)
    const words = Array.from({ length: 1 + Math.floor(next() * 3) }, () => text(w))
    const s = text(Math.floor(next() * 13))
    assert.deepEqual(findSubstring(s, words), findBySortingPieces(s, words), `${s} ${words}`)
  }
})

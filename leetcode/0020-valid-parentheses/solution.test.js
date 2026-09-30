import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { isValid } from './stack.js'

checkApproaches({ stack: isValid }, [
  { input: ['()'], expected: true },
  { input: ['()[]{}'], expected: true },
  { input: ['(]'], expected: false },
  { input: ['([])'], expected: true },
  { input: ['([)]'], expected: false, label: 'crossed pairs' },
  { input: [''], expected: true },
  { input: ['('], expected: false, label: 'left open' },
  { input: [')'], expected: false, label: 'closes nothing' },
])

// Reference: a string is valid exactly when deleting (), [] and {} again and
// again empties it.
function isValidByDeletingPairs(s) {
  for (let shorter = s.replace(/\(\)|\[\]|\{\}/g, ''); shorter !== s; shorter = s.replace(/\(\)|\[\]|\{\}/g, '')) s = shorter
  return s === ''
}

it('agrees with deleting matched pairs on 3,000 random strings', () => {
  const next = createRandom(120)
  const pick = items => items[Math.floor(next() * items.length)]
  for (let round = 0; round < 3000; round++) {
    // Insert matched pairs at random places, then sometimes spoil one character.
    let s = ''
    for (let pairs = Math.floor(next() * 7); pairs > 0; pairs--) {
      const at = Math.floor(next() * (s.length + 1))
      s = s.slice(0, at) + pick(['()', '[]', '{}']) + s.slice(at)
    }
    if (s && next() < 0.5) {
      const at = Math.floor(next() * s.length)
      s = s.slice(0, at) + pick([...'()[]{}']) + s.slice(at + 1)
    }
    assert.equal(isValid(s), isValidByDeletingPairs(s), s)
  }
})

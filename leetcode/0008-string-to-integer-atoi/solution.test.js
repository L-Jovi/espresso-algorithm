import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { myAtoi } from './regex.js'

checkApproaches({ regex: myAtoi }, [
  { input: ['42'], expected: 42 },
  { input: ['   -042'], expected: -42 },
  { input: ['1337c0d3'], expected: 1337 },
  { input: ['0-1'], expected: 0 },
  { input: ['words and 987'], expected: 0 },
  { input: ['-91283472332'], expected: -(2 ** 31), label: 'clamped below' },
  { input: ['91283472332'], expected: 2 ** 31 - 1, label: 'clamped above' },
  { input: ['9'.repeat(400)], expected: 2 ** 31 - 1, label: '400 nines' },
  { input: ['  0000000000012345678'], expected: 12345678 },
  { input: ['+-12'], expected: 0 },
  { input: ['-0'], expected: 0, label: '-0 is 0' },
  { input: [''], expected: 0 },
  { input: [' '], expected: 0 },
])

it('agrees with a clamped parseInt on 5,000 random strings', () => {
  const alphabet = ' +-0123456789a.'
  const next = createRandom(108)
  for (let round = 0; round < 5000; round++) {
    const s = Array.from({ length: Math.floor(next() * 12) }, () => alphabet[Math.floor(next() * alphabet.length)]).join('')
    // parseInt also skips tabs and newlines, which this alphabet leaves out.
    const expected = Math.min(Math.max(parseInt(s, 10) || 0, -(2 ** 31)), 2 ** 31 - 1)
    assert.equal(myAtoi(s), expected, JSON.stringify(s))
  }
})

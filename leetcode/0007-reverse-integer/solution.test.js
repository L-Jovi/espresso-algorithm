import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { reverse as digitMath } from './digit-math.js'
import { reverse as stringReversal } from './string-reversal.js'

const approaches = { 'string reversal': stringReversal, 'digit math': digitMath }

checkApproaches(approaches, [
  { input: [123], expected: 321 },
  { input: [-123], expected: -321 },
  { input: [120], expected: 21 },
  { input: [0], expected: 0 },
  { input: [1534236469], expected: 0, label: 'overflows' },
  { input: [2 ** 31 - 1], expected: 0 },
  { input: [-(2 ** 31)], expected: 0 },
  { input: [1463847412], expected: 2147483641, label: 'just fits' },
])

it('both approaches agree on 20,000 random 32-bit integers', () => {
  const next = createRandom(107)
  for (let round = 0; round < 20_000; round++) {
    const x = Math.floor(next() * 2 ** 32) - 2 ** 31
    assert.equal(digitMath(x), stringReversal(x), String(x))
  }
})

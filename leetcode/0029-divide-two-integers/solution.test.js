import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { divide } from './doubling.js'

const MAX = 2 ** 31 - 1
const MIN = -(2 ** 31)

checkApproaches({ doubling: divide }, [
  { input: [10, 3], expected: 3 },
  { input: [7, -3], expected: -2 },
  { input: [0, 1], expected: 0 },
  { input: [1, -2], expected: 0, label: 'rounds toward zero, to +0' },
  { input: [MIN, -1], expected: MAX, label: 'the only overflow is clamped' },
  { input: [MIN, 1], expected: MIN },
  { input: [MIN, 2], expected: -(2 ** 30) },
  { input: [MAX, MIN], expected: 0 },
  { input: [MIN, MIN], expected: 1 },
])

it('agrees with Math.trunc on 20,000 random pairs of 32-bit integers', () => {
  const next = createRandom(129)
  const int32 = () => Math.floor(next() * 2 ** 32) + MIN
  const small = () => Math.floor(next() * 201) - 100
  for (let round = 0; round < 20_000; round++) {
    const dividend = next() < 0.5 ? int32() : small()
    const divisor = (next() < 0.5 ? small() : int32()) || 1
    const expected = Math.min(Math.trunc(dividend / divisor), MAX) + 0 // + 0 turns −0 into +0
    assert.equal(divide(dividend, divisor), expected, `${dividend} / ${divisor}`)
  }
})

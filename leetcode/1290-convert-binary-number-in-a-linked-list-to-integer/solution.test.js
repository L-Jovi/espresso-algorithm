import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList } from '../../shared/linked-list.js'
import { createRandom } from '../../shared/random.js'
import { getDecimalValue as onePass } from './one-pass.js'
import { getDecimalValue as powersOfTwo } from './powers-of-two.js'

const approaches = { 'powers of two': powersOfTwo, 'one pass': onePass }

checkApproaches(approaches, [
  { input: [[1, 0, 1]], expected: 5 },
  { input: [[0]], expected: 0 },
  { input: [[1]], expected: 1 },
  { input: [[1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]], expected: 18880 },
  { input: [[0, 0]], expected: 0 },
], { prepare: ([bits]) => [arrayToList(bits)] })

it('both approaches agree with parseInt(bits, 2) on 1,000 random lists of up to 30 bits', () => {
  const next = createRandom(1290)
  for (let round = 0; round < 1000; round++) {
    const bits = Array.from({ length: 1 + Math.floor(next() * 30) }, () => Math.floor(next() * 2))
    for (const read of Object.values(approaches)) assert.equal(read(arrayToList(bits)), parseInt(bits.join(''), 2))
  }
})

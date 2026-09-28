import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { convert } from './simulation.js'

checkApproaches({ simulation: convert }, [
  { input: ['PAYPALISHIRING', 3], expected: 'PAHNAPLSIIGYIR' },
  { input: ['PAYPALISHIRING', 4], expected: 'PINALSIGYAHRPI' },
  { input: ['A', 1], expected: 'A' },
  { input: ['AB', 1], expected: 'AB' },
  { input: ['ABC', 5], expected: 'ABC', label: 'more rows than characters' },
  { input: ['saber', 4], expected: 'sabre', label: 'the last character climbs back to row 2' },
])

// Reference: the zigzag repeats every 2 · numRows − 2 characters, so the row of
// each index follows from its position in that cycle.
function convertByFormula(s, numRows) {
  if (numRows < 2) return s
  const cycle = 2 * numRows - 2
  const rowOf = i => Math.min(i % cycle, cycle - (i % cycle))
  return [...Array(s.length).keys()].toSorted((a, b) => rowOf(a) - rowOf(b) || a - b).map(i => s[i]).join('')
}

it('agrees with the cycle formula on 2,000 random strings', () => {
  const next = createRandom(106)
  for (let round = 0; round < 2000; round++) {
    const s = Array.from({ length: Math.floor(next() * 30) }, () => String.fromCharCode(97 + Math.floor(next() * 26))).join('')
    const numRows = 1 + Math.floor(next() * 8)
    assert.equal(convert(s, numRows), convertByFormula(s, numRows), `${s} ${numRows}`)
  }
})

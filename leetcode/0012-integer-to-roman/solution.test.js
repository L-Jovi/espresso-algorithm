import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { intToRoman as greedy } from './greedy.js'
import { intToRoman as lookupTable } from './lookup-table.js'

checkApproaches({ greedy, 'lookup table': lookupTable }, [
  { input: [3], expected: 'III' },
  { input: [4], expected: 'IV' },
  { input: [58], expected: 'LVIII' },
  { input: [1994], expected: 'MCMXCIV' },
  { input: [3749], expected: 'MMMDCCXLIX' },
  { input: [3888], expected: 'MMMDCCCLXXXVIII', label: 'the longest numeral' },
  { input: [3999], expected: 'MMMCMXCIX' },
])

it('both approaches agree on every number from 1 to 3999', () => {
  for (let num = 1; num <= 3999; num++) assert.equal(greedy(num), lookupTable(num), String(num))
})

import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { intToRoman } from '../0012-integer-to-roman/greedy.js'
import { romanToInt } from './lookup-table.js'

checkApproaches({ 'lookup table': romanToInt }, [
  { input: ['III'], expected: 3 },
  { input: ['IV'], expected: 4 },
  { input: ['LVIII'], expected: 58 },
  { input: ['MCMXCIV'], expected: 1994 },
  { input: ['MMMCMXCIX'], expected: 3999 },
])

it('undoes LeetCode 12 for every number from 1 to 3999', () => {
  for (let num = 1; num <= 3999; num++) assert.equal(romanToInt(intToRoman(num)), num, String(num))
})

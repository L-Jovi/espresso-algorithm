import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { letterCombinations } from './backtracking.js'

checkApproaches({ backtracking: letterCombinations }, [
  { input: ['23'], expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] },
  { input: [''], expected: [] },
  { input: ['2'], expected: ['a', 'b', 'c'] },
  { input: ['7'], expected: ['p', 'q', 'r', 's'] },
])

// Reference: build the combinations digit by digit, without recursion.
const KEYPAD = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }
const combineByLoop = digits =>
  digits === '' ? [] : [...digits].reduce((prefixes, digit) => prefixes.flatMap(p => [...KEYPAD[digit]].map(c => p + c)), [''])

it('agrees with building the combinations in a loop on 300 random inputs', () => {
  const next = createRandom(117)
  for (let round = 0; round < 300; round++) {
    const digits = Array.from({ length: Math.floor(next() * 5) }, () => 2 + Math.floor(next() * 8)).join('')
    assert.deepEqual(letterCombinations(digits), combineByLoop(digits), digits)
  }
})

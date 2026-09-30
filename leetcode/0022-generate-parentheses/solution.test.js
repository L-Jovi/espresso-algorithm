import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { generateParenthesis } from './backtracking.js'

checkApproaches({ backtracking: generateParenthesis }, [
  { input: [1], expected: ['()'] },
  { input: [2], expected: ['(())', '()()'] },
  { input: [3], expected: ['((()))', '(()())', '(())()', '()(())', '()()()'] },
])

const isWellFormed = s => {
  let depth = 0
  for (const char of s) {
    depth += char === '(' ? 1 : -1
    if (depth < 0) return false
  }
  return depth === 0
}

it('lists each well-formed string once, as many as the Catalan number, for n up to 10', () => {
  let catalan = 1 // C(0)
  for (let n = 1; n <= 10; n++) {
    catalan = (catalan * 2 * (2 * n - 1)) / (n + 1) // C(n) from C(n − 1)
    const strings = generateParenthesis(n)
    assert.equal(strings.length, catalan, `n = ${n}`)
    assert.equal(new Set(strings).size, strings.length, 'no duplicates')
    assert.ok(strings.every(s => s.length === 2 * n && isWellFormed(s)))
  }
})

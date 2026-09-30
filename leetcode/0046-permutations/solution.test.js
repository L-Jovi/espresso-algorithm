import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { permute } from './backtracking.js'

checkApproaches({ backtracking: permute }, [
  { input: [[1, 2, 3]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
  { input: [[0, 1]], expected: [[0, 1], [1, 0]] },
  { input: [[1]], expected: [[1]] },
])

it('lists all n! orderings exactly once for n up to 7', () => {
  let factorial = 1
  for (let n = 1; n <= 7; n++) {
    factorial *= n
    const nums = Array.from({ length: n }, (_, i) => 10 * i - 30)
    const orderings = permute(nums)
    assert.equal(orderings.length, factorial)
    assert.equal(new Set(orderings.map(String)).size, factorial, 'no duplicates')
    const sorted = String(nums.toSorted((a, b) => a - b))
    assert.ok(orderings.every(o => String(o.toSorted((a, b) => a - b)) === sorted), 'each uses every number once')
  }
})

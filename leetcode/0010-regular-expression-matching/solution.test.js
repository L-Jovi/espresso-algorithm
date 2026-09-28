import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { isMatch } from './memoization.js'

checkApproaches({ memoization: isMatch }, [
  { input: ['aa', 'a'], expected: false },
  { input: ['aa', 'a*'], expected: true },
  { input: ['ab', '.*'], expected: true },
  { input: ['aab', 'c*a*b'], expected: true },
  { input: ['mississippi', 'mis*is*p*.'], expected: false },
  { input: ['ab', '.*c'], expected: false },
  { input: ['', 'a*b*'], expected: true },
  { input: ['', ''], expected: true },
  { input: ['a', ''], expected: false },
  { input: ['a'.repeat(30), 'a*'.repeat(10) + 'b'], expected: false, label: 'many stars, no match' },
])

it('agrees with the built-in RegExp on 5,000 random pairs', () => {
  const next = createRandom(110)
  const pick = chars => chars[Math.floor(next() * chars.length)]
  for (let round = 0; round < 5000; round++) {
    const s = Array.from({ length: Math.floor(next() * 8) }, () => pick('ab')).join('')
    const p = Array.from({ length: Math.floor(next() * 5) }, () => pick('ab.') + (next() < 0.5 ? '*' : '')).join('')
    assert.equal(isMatch(s, p), new RegExp(`^(?:${p})$`).test(s), `${s} ~ ${p}`)
  }
})

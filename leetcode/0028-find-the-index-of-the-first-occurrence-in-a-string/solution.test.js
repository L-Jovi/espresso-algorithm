import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { strStr as bruteForce } from './brute-force.js'
import { strStr as kmp } from './kmp.js'

const approaches = { 'brute force': bruteForce, kmp }

checkApproaches(approaches, [
  { input: ['sadbutsad', 'sad'], expected: 0 },
  { input: ['leetcode', 'leeto'], expected: -1 },
  { input: ['mississippi', 'issip'], expected: 4 },
  { input: ['aaaaaaab', 'aaab'], expected: 4 },
  { input: ['abc', 'c'], expected: 2, label: 'at the very end' },
  { input: ['a', 'aa'], expected: -1, label: 'needle longer than haystack' },
  { input: ['abc', ''], expected: 0, label: 'empty needle, like indexOf' },
])

it('both approaches agree with indexOf on 5,000 random two-letter texts', () => {
  const next = createRandom(128)
  const text = length => Array.from({ length }, () => 'ab'[Math.floor(next() * 2)]).join('')
  for (let round = 0; round < 5000; round++) {
    const [haystack, needle] = [text(Math.floor(next() * 20)), text(Math.floor(next() * 5))]
    for (const solve of Object.values(approaches)) assert.equal(solve(haystack, needle), haystack.indexOf(needle), `${haystack} / ${needle}`)
  }
})

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRandom, randomIntegers } from '../shared/random.js'
import { binarySearch, lowerBound } from './binary-search/binary-search.js'
import { prefixFunction, strStr } from './kmp/kmp.js'

describe('binarySearch', () => {
  it('finds the example values', () => {
    const sorted = [10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98]
    assert.equal(binarySearch(sorted, 23), 5)
    assert.equal(binarySearch(sorted, 10), 0)
    assert.equal(binarySearch(sorted, 98), 14)
    assert.equal(binarySearch(sorted, 50), -1)
    assert.equal(binarySearch([], 1), -1)
  })

  it('agrees with a linear scan on 2,000 random sorted arrays with duplicates', () => {
    const next = createRandom(21)
    for (let round = 0; round < 2000; round++) {
      const sorted = randomIntegers(Math.floor(next() * 40), { min: -20, max: 20, seed: round + 1 }).sort((a, b) => a - b)
      const target = Math.floor(next() * 50) - 25
      const index = binarySearch(sorted, target)
      if (sorted.includes(target)) assert.equal(sorted[index], target)
      else assert.equal(index, -1)
      assert.equal(lowerBound(sorted, target), sorted.findIndex(value => value >= target) === -1 ? sorted.length : sorted.findIndex(value => value >= target))
    }
  })

  it('accepts a comparator for arrays sorted another way', () => {
    const descending = [9, 7, 5, 3, 1]
    assert.equal(binarySearch(descending, 3, (a, b) => b - a), 3)
    assert.equal(lowerBound(descending, 4, (a, b) => b - a), 3)
  })
})

describe('KMP', () => {
  it('answers the examples that were left in the unfinished file', () => {
    assert.equal(strStr('mississippi', 'issip'), 4)
    assert.equal(strStr('aaacaaab', 'aaab'), 4)
    assert.equal(strStr('aaaaaaab', 'aaab'), 4)
  })

  it('handles empty and missing needles like indexOf', () => {
    assert.equal(strStr('abc', ''), 0)
    assert.equal(strStr('', ''), 0)
    assert.equal(strStr('', 'a'), -1)
    assert.equal(strStr('abc', 'abcd'), -1)
  })

  it('computes the prefix function', () => {
    assert.deepEqual(prefixFunction('aabaaab'), [0, 1, 0, 1, 2, 2, 3])
    assert.deepEqual(prefixFunction('abcd'), [0, 0, 0, 0])
    assert.deepEqual(prefixFunction('aaaa'), [0, 1, 2, 3])
  })

  it('agrees with String.prototype.indexOf on 5,000 random texts over a two-letter alphabet', () => {
    // A small alphabet makes partial matches, and therefore fallbacks, frequent.
    const next = createRandom(22)
    const word = length => Array.from({ length }, () => (next() < 0.5 ? 'a' : 'b')).join('')
    for (let round = 0; round < 5000; round++) {
      const haystack = word(Math.floor(next() * 30))
      const needle = word(Math.floor(next() * 7))
      assert.equal(strStr(haystack, needle), haystack.indexOf(needle), `strStr(${haystack}, ${needle})`)
    }
  })
})

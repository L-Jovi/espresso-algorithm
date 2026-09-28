import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { findMedianSortedArrays as binarySearch } from './binary-search.js'
import { findMedianSortedArrays as merge } from './merge.js'

const approaches = { merge, 'binary search': binarySearch }

checkApproaches(approaches, [
  { input: [[1, 3], [2]], expected: 2 },
  { input: [[1, 2], [3, 4]], expected: 2.5 },
  { input: [[], [1]], expected: 1 },
  { input: [[2], []], expected: 2 },
  { input: [[1, 1, 1], [1, 1]], expected: 1 },
  { input: [[-5, 3, 6, 12, 15], [-12, -10, -6, -3, 4, 10]], expected: 3 },
])

it('both approaches agree with sorting on 2,000 random pairs and leave the inputs alone', () => {
  const next = createRandom(104)
  const sortedArray = () => Array.from({ length: Math.floor(next() * 12) }, () => Math.floor(next() * 41) - 20).sort((x, y) => x - y)
  for (let round = 0; round < 2000; round++) {
    const [a, b] = [sortedArray(), sortedArray()]
    if (a.length + b.length === 0) continue
    const all = [...a, ...b].sort((x, y) => x - y)
    const m = all.length >> 1
    const expected = all.length % 2 ? all[m] : (all[m - 1] + all[m]) / 2
    const [copyA, copyB] = [[...a], [...b]]
    for (const median of Object.values(approaches)) assert.equal(median(a, b), expected)
    assert.deepEqual([a, b], [copyA, copyB])
  }
})

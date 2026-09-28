import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRandom, randomFloats, randomIntegers } from '../shared/random.js'
import { shakerSort as shakerSortFixed } from './bidirectional-bubble-sort/fixed-bounds.js'
import { shakerSort as shakerSortShrinking } from './bidirectional-bubble-sort/shrinking-bounds.js'
import { bubbleSort } from './bubble-sort/bubble-sort.js'
import { heapSort } from './heap-sort/heap-sort.js'
import { insertionSort } from './insertion-sort/insertion-sort.js'
import { mergeSort as mergeSortBottomUp } from './merge-sort/bottom-up.js'
import { mergeSort as mergeSortCopying } from './merge-sort/top-down-copying.js'
import { mergeSort as mergeSortIndices } from './merge-sort/top-down-indices.js'
import { quickSort as quickSortThreeWay } from './quick-sort/three-way-in-place.js'
import { quickSort as quickSortTwoWay } from './quick-sort/two-way-copying.js'
import { radixSort } from './radix-sort/radix-sort.js'
import { exchangeSort } from './selection-sort/exchange-sort.js'
import { selectionSort } from './selection-sort/selection-sort.js'
import { shellSort } from './shell-sort/shell-sort.js'

// inPlace: the sort rearranges the array it is given and returns it.
// Otherwise it returns a new array and leaves the input alone.
const sorts = [
  { name: 'bubble sort', sort: bubbleSort, stable: true, inPlace: true },
  { name: 'shaker sort, shrinking bounds', sort: shakerSortShrinking, stable: true, inPlace: true },
  { name: 'shaker sort, fixed bounds', sort: shakerSortFixed, stable: true, inPlace: true },
  { name: 'selection sort', sort: selectionSort, stable: false, inPlace: true },
  { name: 'exchange sort', sort: exchangeSort, stable: false, inPlace: true },
  { name: 'insertion sort', sort: insertionSort, stable: true, inPlace: true },
  { name: 'shell sort', sort: shellSort, stable: false, inPlace: true },
  { name: 'merge sort, top down, copying', sort: mergeSortCopying, stable: true, inPlace: false },
  { name: 'merge sort, top down, indices', sort: mergeSortIndices, stable: true, inPlace: true },
  { name: 'merge sort, bottom up', sort: mergeSortBottomUp, stable: true, inPlace: true },
  { name: 'quick sort, two-way, copying', sort: quickSortTwoWay, stable: false, inPlace: false },
  { name: 'quick sort, three-way, in place', sort: quickSortThreeWay, stable: false, inPlace: true },
  { name: 'heap sort', sort: heapSort, stable: false, inPlace: true },
  { name: 'radix sort', sort: radixSort, stable: true, inPlace: true, integersOnly: true },
]

const ascending = (a, b) => a - b
const reference = array => array.toSorted(ascending)

// Small inputs, including every input that broke an earlier version of a sort.
const edgeCases = [
  [], [1], [1, 2], [2, 1], [3, 1, 2], [5, 5, 5, 5], [1, 2, 3, 4, 5], [5, 4, 3, 2, 1],
  [0, -1, 1, -2, 2], [13, 12], [10, 2], [100, 1, 10], [-5, 3], [1, 0, 1], [5, 4, 3, 2, 1, 0, -1, -2, -3],
]

for (const { name, sort, stable, inPlace, integersOnly } of sorts) {
  describe(name, () => {
    it('sorts small and tricky inputs', () => {
      for (const input of edgeCases) {
        assert.deepEqual(sort([...input]), reference(input), `input ${JSON.stringify(input)}`)
      }
    })

    it('agrees with the built-in sort on 1,000 seeded random arrays', () => {
      const next = createRandom(2026)
      for (let round = 0; round < 1000; round++) {
        const length = Math.floor(next() * 70)
        const input = integersOnly || round % 2 === 0
          ? randomIntegers(length, { min: -1000, max: 1000, seed: round + 1 })
          : randomFloats(length, { min: -1000, max: 1000, seed: round + 1 })
        assert.deepEqual(sort([...input]), reference(input), `seed ${round + 1}, length ${length}`)
      }
    })

    if (inPlace) {
      it('sorts the given array and returns it', () => {
        const input = [3, 1, 2]
        assert.equal(sort(input), input)
        assert.deepEqual(input, [1, 2, 3])
      })
    } else {
      it('returns a new array and leaves the input unchanged', () => {
        const input = [3, 1, 2]
        const output = sort(input)
        assert.notEqual(output, input)
        assert.deepEqual(input, [3, 1, 2])
        assert.deepEqual(output, [1, 2, 3])
      })
    }

    if (!integersOnly) {
      it('accepts a comparator, like Array.prototype.sort', () => {
        const descending = (a, b) => b - a
        assert.deepEqual(sort([3, 1, 4, 1, 5, 9, 2, 6], descending), [9, 6, 5, 4, 3, 2, 1, 1])
      })
    }

    if (stable && !integersOnly) {
      it('keeps equal items in their original order (stable)', () => {
        const next = createRandom(99)
        const items = Array.from({ length: 300 }, (_, id) => ({ key: Math.floor(next() * 10), id }))
        const sorted = sort([...items], (a, b) => a.key - b.key)
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i - 1].key === sorted[i].key) assert.ok(sorted[i - 1].id < sorted[i].id)
        }
      })
    }
  })
}

describe('radix sort, integers only', () => {
  it('rejects numbers without decimal digits to sort by', () => {
    assert.throws(() => radixSort([1.5, 2]), TypeError)
  })
})

describe('fast sorts stay fast', () => {
  const large = randomIntegers(20_000, { min: -1_000_000, max: 1_000_000, seed: 5 })
  const inputs = {
    'random items': large,
    'sorted items': reference(large),
    'identical items': Array(20_000).fill(7),
  }
  const fast = sorts.filter(({ name }) => /merge|three-way|heap|shell|radix/.test(name))

  for (const { name, sort } of fast) {
    for (const [label, input] of Object.entries(inputs)) {
      // An earlier three-way quick sort took 22 s on 4,000 random items; now all
      // of these finish in milliseconds. The timeout only catches a regression.
      it(`${name} sorts 20,000 ${label} in time`, { timeout: 5000 }, () => {
        assert.deepEqual(sort([...input]), reference(input))
      })
    }
  }
})

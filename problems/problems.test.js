import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRandom, randomIntegers } from '../shared/random.js'
import { add } from './adding-large-numbers/digit-by-digit.js'
import { unique as uniqueByExtraArray } from './array-deduplication/extra-array.js'
import { unique as uniqueBySet } from './array-deduplication/set.js'
import { unique as uniqueBySortFirst } from './array-deduplication/sort-first.js'
import { partition, sortColors } from './dutch-national-flag/partition.js'
import { knapsack as knapsackBruteForce } from './knapsack-0-1/brute-force.js'
import { knapsack as knapsackRecursionToTable } from './knapsack-0-1/recursion-to-table.js'
import { knapsack as knapsackTabulation } from './knapsack-0-1/tabulation.js'
import { maxOf } from './max-number-in-array/divide-and-conquer.js'
import { smallSum as smallSumBruteForce } from './small-sum/brute-force.js'
import { smallSum as smallSumMergeSort } from './small-sum/merge-sort.js'

describe('adding large numbers', () => {
  it('adds the examples', () => {
    assert.equal(add('99', '99'), '198')
    assert.equal(add('0', '0'), '0')
    assert.equal(add('1', '999'), '1000')
    assert.equal(add('9007199254740993', '1'), '9007199254740994')
    assert.equal(add('007', '1'), '8')
  })

  it('agrees with BigInt on 3,000 random pairs of up to 60 digits', () => {
    const next = createRandom(31)
    const digits = () => Array.from({ length: 1 + Math.floor(next() * 60) }, () => Math.floor(next() * 10)).join('')
    for (let round = 0; round < 3000; round++) {
      const [a, b] = [digits(), digits()]
      assert.equal(add(a, b), (BigInt(a) + BigInt(b)).toString(), `${a} + ${b}`)
    }
  })

  it('rejects anything that is not a string of digits', () => {
    for (const [a, b] of [['', '1'], ['-5', '3'], ['1.5', '2'], ['12a', '1'], [99, '1']]) {
      assert.throws(() => add(a, b), TypeError)
    }
  })
})

describe('array deduplication', () => {
  it('all three remove duplicates from arrays of numbers', () => {
    const next = createRandom(32)
    for (let round = 0; round < 500; round++) {
      const input = randomIntegers(Math.floor(next() * 30), { min: -5, max: 5, seed: round + 1 })
      const expected = [...new Set(input)]
      assert.deepEqual(uniqueByExtraArray(input), expected)
      assert.deepEqual(uniqueBySet(input), expected)
      assert.deepEqual(uniqueBySortFirst(input), expected.toSorted((a, b) => a - b))
    }
  })

  it('keeps 1 and "1" apart', () => {
    assert.deepEqual(uniqueByExtraArray([1, 1, '1']), [1, '1'])
    assert.deepEqual(uniqueBySet([1, 1, '1']), [1, '1'])
  })

  it('shows the NaN difference between indexOf and Set', () => {
    assert.deepEqual(uniqueBySet([NaN, NaN]), [NaN])
    // indexOf uses ===, and NaN === NaN is false, so every NaN stays.
    assert.deepEqual(uniqueByExtraArray([NaN, NaN]), [NaN, NaN])
  })

  it('sorts numerically and leaves the input alone', () => {
    const input = [10, 9, 10, 2]
    assert.deepEqual(uniqueBySortFirst(input), [2, 9, 10])
    assert.deepEqual(input, [10, 9, 10, 2])
  })
})

describe('0-1 knapsack', () => {
  const approaches = [
    ['brute force', knapsackBruteForce],
    ['recursion to table', knapsackRecursionToTable],
    ['tabulation', knapsackTabulation],
  ]

  for (const [name, knapsack] of approaches) {
    it(`${name} solves the examples`, () => {
      assert.equal(knapsack([2, 1, 3], [4, 2, 3], 4), 6)
      assert.equal(knapsack([3, 2, 4, 7], [5, 6, 3, 19], 11), 25)
      assert.equal(knapsack([], [], 10), 0)
      assert.equal(knapsack([5], [10], 4), 0)
    })

    it(`${name} counts items of weight 0, even in a full bag`, () => {
      assert.equal(knapsack([0, 3], [5, 2], 0), 5)
      assert.equal(knapsack([0, 0, 1], [1, 2, 4], 1), 7)
    })
  }

  it('all three agree on 500 random instances', () => {
    const next = createRandom(33)
    for (let round = 0; round < 500; round++) {
      const n = Math.floor(next() * 10)
      const weights = Array.from({ length: n }, () => Math.floor(next() * 8))
      const values = Array.from({ length: n }, () => Math.floor(next() * 20))
      const capacity = Math.floor(next() * 20)
      const expected = knapsackBruteForce(weights, values, capacity)
      assert.equal(knapsackRecursionToTable(weights, values, capacity), expected)
      assert.equal(knapsackTabulation(weights, values, capacity), expected)
    }
  })
})

describe('max number in array', () => {
  it('agrees with Math.max on 1,000 random arrays', () => {
    const next = createRandom(34)
    for (let round = 0; round < 1000; round++) {
      const input = randomIntegers(1 + Math.floor(next() * 50), { seed: round + 1 })
      assert.equal(maxOf(input), Math.max(...input))
    }
  })

  it('returns -Infinity for an empty array, like Math.max()', () => {
    assert.equal(maxOf([]), -Infinity)
  })

  it('handles a million items: the recursion is only about 20 levels deep', () => {
    const input = randomIntegers(1_000_000, { seed: 3 })
    // Math.max(...input) would pass a million arguments and overflow the stack.
    assert.equal(maxOf(input), input.reduce((a, b) => Math.max(a, b), -Infinity))
  })
})

describe('Dutch national flag', () => {
  it('groups smaller, equal and larger items on 1,000 random arrays', () => {
    const next = createRandom(35)
    for (let round = 0; round < 1000; round++) {
      const input = randomIntegers(Math.floor(next() * 30), { min: 0, max: 6, seed: round + 1 })
      const array = [...input]
      const pivot = Math.floor(next() * 7)
      const [first, last] = partition(array, pivot)
      assert.deepEqual(array.toSorted((a, b) => a - b), input.toSorted((a, b) => a - b), 'same items')
      array.forEach((value, index) => {
        if (index < first) assert.ok(value < pivot)
        else if (index <= last) assert.equal(value, pivot)
        else assert.ok(value > pivot)
      })
    }
  })

  it('sorts colors (LeetCode 75)', () => {
    assert.deepEqual(sortColors([2, 0, 2, 1, 1, 0]), [0, 0, 1, 1, 2, 2])
    assert.deepEqual(sortColors([2, 0, 1]), [0, 1, 2])
    assert.deepEqual(sortColors([]), [])
  })
})

describe('small sum', () => {
  it('solves the example', () => {
    assert.equal(smallSumBruteForce([1, 3, 4, 2, 5]), 16)
    assert.equal(smallSumMergeSort([1, 3, 4, 2, 5]), 16)
  })

  it('merge sort agrees with brute force on 2,000 random arrays with duplicates and negatives', () => {
    const next = createRandom(36)
    for (let round = 0; round < 2000; round++) {
      const input = randomIntegers(Math.floor(next() * 40), { min: -10, max: 10, seed: round + 1 })
      assert.equal(smallSumMergeSort(input), smallSumBruteForce(input))
    }
  })

  it('does not change the input', () => {
    const input = [5, 1, 4]
    smallSumMergeSort(input)
    assert.deepEqual(input, [5, 1, 4])
  })
})

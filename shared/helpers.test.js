import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { swap } from './swap.js'
import { measure } from './measure.js'
import { createRandom, randomIntegers, randomFloats } from './random.js'
import { showSort } from './demo.js'
import { arrayToList, listToArray } from './linked-list.js'
import { checkApproaches } from './check.js'
import { randomTree } from './random-tree.js'
import { binaryTree2Array } from '../data-structures/tree/binary-tree-array.js'

describe('swap', () => {
  it('swaps two items in place and returns the same array', () => {
    const array = [1, 2, 3]
    assert.equal(swap(array, 0, 2), array)
    assert.deepEqual(array, [3, 2, 1])
  })

  it('accepts swapping an index with itself', () => {
    assert.deepEqual(swap([7], 0, 0), [7])
  })

  it('rejects indexes outside the array instead of growing it', () => {
    const array = [1, 2]
    assert.throws(() => swap(array, 0, 5), RangeError)
    assert.throws(() => swap(array, -1, 0), RangeError)
    assert.deepEqual(array, [1, 2])
  })
})

describe('measure', () => {
  it('returns the result and a non-negative duration', () => {
    const { result, ms } = measure((a, b) => a + b, 2, 3)
    assert.equal(result, 5)
    assert.ok(ms >= 0)
  })
})

describe('createRandom', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = createRandom(42)
    const b = createRandom(42)
    for (let i = 0; i < 100; i++) assert.equal(a(), b())
  })

  it('produces different sequences for different seeds', () => {
    const a = createRandom(1)
    const b = createRandom(2)
    const same = Array.from({ length: 20 }, () => a() === b()).filter(Boolean).length
    assert.ok(same < 20)
  })

  it('stays within [0, 1)', () => {
    const next = createRandom(7)
    for (let i = 0; i < 10_000; i++) {
      const value = next()
      assert.ok(value >= 0 && value < 1)
    }
  })
})

describe('randomIntegers', () => {
  it('returns the requested number of integers inside the inclusive range', () => {
    const values = randomIntegers(5000, { min: -3, max: 3, seed: 9 })
    assert.equal(values.length, 5000)
    assert.ok(values.every(Number.isInteger))
    assert.ok(values.every(value => value >= -3 && value <= 3))
    // Both ends of the range are reachable.
    assert.ok(values.includes(-3) && values.includes(3))
  })

  it('includes negative numbers by default', () => {
    assert.ok(randomIntegers(100).some(value => value < 0))
  })

  it('is reproducible', () => {
    assert.deepEqual(randomIntegers(50, { seed: 3 }), randomIntegers(50, { seed: 3 }))
  })
})

describe('randomFloats', () => {
  it('rounds to the requested number of decimals', () => {
    const values = randomFloats(1000, { min: 0, max: 1, digits: 2, seed: 5 })
    assert.ok(values.every(value => value >= 0 && value <= 1))
    // Compare through toFixed: 0.29 * 100 is 28.999999999999996 in binary floating point.
    assert.ok(values.every(value => Number(value.toFixed(2)) === value))
    assert.ok(values.some(value => !Number.isInteger(value)))
  })
})

describe('showSort', () => {
  it('prints the input and the sorted output', t => {
    const log = t.mock.method(console, 'log', () => {})
    showSort(array => array.sort((a, b) => a - b), { length: 5, seed: 1 })
    const [input, sorted] = log.mock.calls.map(call => call.arguments[0])
    const numbers = line => line.split(/\s+/).slice(1).map(Number)
    assert.deepEqual(numbers(sorted), numbers(input).toSorted((a, b) => a - b))
  })
})

describe('linked-list helpers', () => {
  it('round-trips arrays of every length from 0 to 5', () => {
    for (let n = 0; n <= 5; n++) {
      const array = Array.from({ length: n }, (_, i) => i * 10)
      assert.deepEqual(listToArray(arrayToList(array)), array)
    }
    assert.equal(arrayToList([]), null)
  })
})

describe('checkApproaches', () => {
  // Two ways to add, run on the same cases; a copy of the input is passed each time.
  checkApproaches(
    { 'plus': (a, b) => a + b, 'minus the negative': (a, b) => a - -b },
    [{ input: [1, 2], expected: 3 }, { input: [-1, 1], expected: 0, label: 'opposite numbers' }],
  )
})

describe('randomTree', () => {
  it('builds trees of every size up to 30 with the values 1 … size, each once', () => {
    const next = createRandom(7)
    for (let size = 0; size <= 30; size++) {
      const values = binaryTree2Array(randomTree(size, next)).filter(value => value !== null)
      assert.deepEqual(values.toSorted((a, b) => a - b), Array.from({ length: size }, (_, i) => i + 1))
    }
  })

  it('makes different shapes', () => {
    const next = createRandom(8)
    const shapes = new Set(Array.from({ length: 50 }, () => String(binaryTree2Array(randomTree(6, next)).map(v => v === null ? 0 : 1))))
    assert.ok(shapes.size > 20, `${shapes.size} shapes`)
  })
})

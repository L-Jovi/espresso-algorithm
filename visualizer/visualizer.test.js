import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRandom, randomIntegers } from '../shared/random.js'
import { SORTS } from './sorts.js'
import { replay, trace } from './trace.js'

const ascending = (a, b) => a - b

describe('trace', () => {
  it('records reads and writes by index, and leaves the input alone', () => {
    const input = [3, 1, 2]
    const { steps, sorted } = trace(array => {
      const first = array[0]
      array[0] = array[1]
      array[1] = first
      return array.length
    }, input)
    assert.deepEqual(steps, [
      { kind: 'read', index: 0 },
      { kind: 'read', index: 1 },
      { kind: 'write', index: 0, value: 1 },
      { kind: 'write', index: 1, value: 3 },
    ])
    assert.deepEqual(sorted, [1, 3, 2])
    assert.deepEqual(input, [3, 1, 2])
  })

  it('sees the reads made by for...of through the array iterator', () => {
    const { steps } = trace(array => { for (const value of array) void value }, [5, 6])
    assert.deepEqual(steps.map(step => step.index), [0, 1])
  })
})

describe('every sort the visualizer lists', () => {
  for (const { name, sort } of SORTS) {
    it(`${name}: replaying its writes gives the sorted array, on 300 random inputs`, () => {
      const next = createRandom(7)
      for (let round = 0; round < 300; round++) {
        const values = randomIntegers(Math.floor(next() * 60), { min: -50, max: 50, seed: round + 1 })
        const { steps, sorted } = trace(sort, values)
        assert.deepEqual(sorted, values.toSorted(ascending))
        assert.deepEqual(replay(values, steps), sorted, 'the writes alone rebuild the result')
        assert.ok(steps.every(step => step.kind === 'compare' || (step.index >= 0 && step.index < values.length)), 'indexes stay in the array')
      }
    })
  }

  it('lists twelve sorts with unique ids', () => {
    assert.equal(SORTS.length, 12)
    assert.equal(new Set(SORTS.map(entry => entry.id)).size, 12)
  })
})

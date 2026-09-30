import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { arrayToList, listToArray } from '../../shared/linked-list.js'
import { randomIntegers } from '../../shared/random.js'
import { removeNthFromEnd as fastSlowPointers } from './fast-slow-pointers.js'
import { removeNthFromEnd as dummyHead } from './fast-slow-pointers-dummy-head.js'

const approaches = { 'fast and slow pointers': fastSlowPointers, 'with a dummy head': dummyHead }
const lists = { prepare: ([array, n]) => [arrayToList(array), n], check: (actual, expected) => assert.deepEqual(listToArray(actual), expected) }

checkApproaches(approaches, [
  { input: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
  { input: [[1], 1], expected: [] },
  { input: [[1, 2], 1], expected: [1] },
  { input: [[1, 2], 2], expected: [2], label: 'removes the head' },
], lists)

it('both approaches agree with Array.prototype.toSpliced on 500 random lists', () => {
  for (let seed = 1; seed <= 500; seed++) {
    const array = randomIntegers(1 + (seed % 20), { seed })
    const n = 1 + (seed * 7) % array.length
    for (const remove of Object.values(approaches)) {
      assert.deepEqual(listToArray(remove(arrayToList(array), n)), array.toSpliced(array.length - n, 1))
    }
  }
})

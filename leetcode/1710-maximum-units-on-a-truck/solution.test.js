import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { maximumUnits } from './greedy.js'

checkApproaches({ greedy: maximumUnits }, [
  { input: [[[1, 3], [2, 2], [3, 1]], 4], expected: 8 },
  { input: [[[5, 10], [2, 5], [4, 7], [3, 9]], 10], expected: 91 },
  { input: [[[2, 4]], 5], expected: 8, label: 'more room than boxes' },
])

// Reference: list every box's units, largest first, and take truckSize of them.
const unitsOfBestBoxes = (boxTypes, truckSize) =>
  boxTypes.flatMap(([boxes, units]) => new Array(boxes).fill(units)).toSorted((a, b) => b - a).slice(0, truckSize).reduce((a, b) => a + b, 0)

it('agrees with taking the best single boxes on 1,000 random inputs, and leaves the input alone', () => {
  const next = createRandom(1710)
  for (let round = 0; round < 1000; round++) {
    const boxTypes = Array.from({ length: 1 + Math.floor(next() * 6) }, () => [1 + Math.floor(next() * 5), 1 + Math.floor(next() * 9)])
    const copy = structuredClone(boxTypes)
    const truckSize = 1 + Math.floor(next() * 20)
    assert.equal(maximumUnits(boxTypes, truckSize), unitsOfBestBoxes(boxTypes, truckSize))
    assert.deepEqual(boxTypes, copy)
  }
})

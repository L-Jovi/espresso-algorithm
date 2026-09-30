import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { numRescueBoats } from './greedy.js'

checkApproaches({ greedy: numRescueBoats }, [
  { input: [[1, 2], 3], expected: 1 },
  { input: [[3, 2, 2, 1], 3], expected: 3 },
  { input: [[3, 5, 3, 4], 5], expected: 4 },
  { input: [[5], 5], expected: 1 },
])

// Reference: the first person rides alone or with any partner who fits; try every choice.
function fewestBoatsByTrying(people, limit) {
  if (people.length === 0) return 0
  const [first, ...rest] = people
  let best = 1 + fewestBoatsByTrying(rest, limit)
  rest.forEach((partner, i) => {
    if (first + partner <= limit) best = Math.min(best, 1 + fewestBoatsByTrying(rest.toSpliced(i, 1), limit))
  })
  return best
}

it('agrees with trying every pairing on 500 random groups, and leaves the input alone', () => {
  const next = createRandom(881)
  for (let round = 0; round < 500; round++) {
    const limit = 5 + Math.floor(next() * 10)
    const people = Array.from({ length: 1 + Math.floor(next() * 7) }, () => 1 + Math.floor(next() * limit))
    const copy = [...people]
    assert.equal(numRescueBoats(people, limit), fewestBoatsByTrying(people, limit), `${people} / ${limit}`)
    assert.deepEqual(people, copy)
  }
})

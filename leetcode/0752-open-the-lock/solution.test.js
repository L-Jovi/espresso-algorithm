import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { openLock as bfs } from './bfs.js'
import { openLock as bidirectional } from './bidirectional-bfs.js'

const approaches = { bfs, 'bidirectional bfs': bidirectional }

checkApproaches(approaches, [
  { input: [['0201', '0101', '0102', '1212', '2002'], '0202'], expected: 6 },
  { input: [['8888'], '0009'], expected: 1 },
  { input: [['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'], '8888'], expected: -1, label: 'the target is walled in' },
  { input: [['0000'], '8888'], expected: -1, label: 'stuck at the start' },
  { input: [[], '0000'], expected: 0 },
])

const randomCode = next => Array.from({ length: 4 }, () => Math.floor(next() * 10)).join('')

it('without dead ends, both need the sum of each wheel\'s shorter way round', () => {
  const next = createRandom(752)
  for (let round = 0; round < 200; round++) {
    const target = randomCode(next)
    const expected = [...target].reduce((sum, digit) => sum + Math.min(Number(digit), 10 - Number(digit)), 0)
    for (const openLock of Object.values(approaches)) assert.equal(openLock([], target), expected, target)
  }
})

it('bidirectional BFS agrees with BFS on 300 random locks with dead ends', () => {
  const next = createRandom(7520)
  for (let round = 0; round < 300; round++) {
    const deadends = Array.from({ length: Math.floor(next() * 60) }, () => randomCode(next))
    const target = randomCode(next)
    assert.equal(bidirectional(deadends, target), bfs(deadends, target), `${target} with ${deadends}`)
  }
})

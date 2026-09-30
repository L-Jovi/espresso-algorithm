import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { swap } from '../../shared/swap.js'
import { balancedStringSplit as balanceCounter } from './balance-counter.js'
import { balancedStringSplit as regexWindow } from './regex-window.js'

const approaches = { 'regex window': regexWindow, 'balance counter': balanceCounter }

checkApproaches(approaches, [
  { input: ['RLRRLLRLRL'], expected: 4 },
  { input: ['RLLLLRRRLR'], expected: 3 },
  { input: ['LLLLRRRR'], expected: 1 },
  { input: ['RLRRRLLRLL'], expected: 2 },
])

// Reference: the most pieces, trying every place for the first cut.
function mostPiecesByTrying(s) {
  if (s === '') return 0
  let best = -Infinity
  for (let end = 2; end <= s.length; end += 2) {
    const piece = s.slice(0, end)
    if ([...piece].filter(c => c === 'L').length * 2 === end) best = Math.max(best, 1 + mostPiecesByTrying(s.slice(end)))
  }
  return best
}

it('both approaches agree with trying every cut on 1,000 random balanced strings', () => {
  const next = createRandom(1221)
  for (let round = 0; round < 1000; round++) {
    const half = 1 + Math.floor(next() * 6)
    const letters = [...'L'.repeat(half) + 'R'.repeat(half)]
    for (let i = letters.length - 1; i > 0; i--) swap(letters, i, Math.floor(next() * (i + 1)))
    const s = letters.join('')
    for (const split of Object.values(approaches)) assert.equal(split(s), mostPiecesByTrying(s), s)
  }
})

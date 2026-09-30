import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches, runOperations } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { Trie } from './trie.js'

checkApproaches({ trie: (operations, args) => runOperations(Trie, operations, args) }, [
  {
    input: [['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'], [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']]],
    expected: [null, null, true, false, true, null, true],
    label: 'LeetCode\'s example',
  },
  {
    input: [['Trie', 'search', 'startsWith', 'insert', 'startsWith', 'search'], [[], ['a'], [''], ['constructor'], ['cons'], ['toString']]],
    expected: [null, false, true, null, true, false],
    label: 'prototype names are ordinary words',
  },
])

it('agrees with a Set of words on 2,000 random operations', () => {
  const next = createRandom(208)
  const word = () => Array.from({ length: Math.floor(next() * 4) }, () => 'ab'[Math.floor(next() * 2)]).join('')
  const trie = new Trie()
  const words = new Set()
  for (let round = 0; round < 2000; round++) {
    const text = word()
    const choice = next()
    if (choice < 0.4) {
      trie.insert(text)
      words.add(text)
    } else if (choice < 0.7) {
      assert.equal(trie.search(text), words.has(text), `search ${text}`)
    } else {
      assert.equal(trie.startsWith(text), [...words].some(w => w.startsWith(text)), `startsWith ${text}`)
    }
  }
})

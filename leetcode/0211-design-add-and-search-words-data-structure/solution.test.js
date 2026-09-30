import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches, runOperations } from '../../shared/check.js'
import { createRandom } from '../../shared/random.js'
import { WordDictionary } from './trie-dfs.js'

checkApproaches({ 'trie with depth-first search': (operations, args) => runOperations(WordDictionary, operations, args) }, [
  {
    input: [
      ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
      [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']],
    ],
    expected: [null, null, null, null, false, true, true, true],
    label: 'LeetCode\'s example',
  },
  {
    input: [['WordDictionary', 'addWord', 'search', 'search', 'search'], [[], ['ab'], ['a'], ['...'], ['..']]],
    expected: [null, null, false, false, true],
    label: 'a prefix is not a word, and each dot is one letter',
  },
])

it('agrees with the built-in RegExp on 2,000 random operations', () => {
  const next = createRandom(211)
  const text = letters => Array.from({ length: 1 + Math.floor(next() * 3) }, () => letters[Math.floor(next() * letters.length)]).join('')
  const dictionary = new WordDictionary()
  const words = []
  for (let round = 0; round < 2000; round++) {
    if (next() < 0.4) {
      const word = text('ab')
      dictionary.addWord(word)
      words.push(word)
    } else {
      // The pattern holds only letters and dots, so it is also a valid regular expression.
      const pattern = text('ab.')
      const regex = new RegExp(`^${pattern}$`)
      assert.equal(dictionary.search(pattern), words.some(word => regex.test(word)), pattern)
    }
  }
})

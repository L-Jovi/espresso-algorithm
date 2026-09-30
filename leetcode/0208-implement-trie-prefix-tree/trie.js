/**
 * LeetCode 208. Implement Trie (Prefix Tree) — https://leetcode.com/problems/implement-trie-prefix-tree/
 * Build a trie with insert(word), search(word), which asks whether the word
 * was inserted, and startsWith(prefix).
 *
 * A trie stores words letter by letter; words with a common prefix share
 * the nodes of that prefix, so every operation takes one step per letter,
 * however many words are stored. The implementation lives in
 * data-structures/tree/trie.js, whose header explains it; this class gives
 * its methods the names LeetCode calls: add → insert, isWord → search.
 *
 * Time: O(L) per operation for a word of length L. Space: O(total letters).
 */

import { Trie as PrefixTree } from '../../data-structures/tree/trie.js'

export class Trie extends PrefixTree {
  insert(word) {
    this.add(word)
  }

  search(word) {
    return this.isWord(word)
  }
}

if (import.meta.main) {
  const trie = new Trie()
  trie.insert('apple')
  console.log(trie.search('apple'), trie.search('app'), trie.startsWith('app'))
}

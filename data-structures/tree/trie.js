/**
 * Trie (prefix tree): words stored letter by letter.
 *
 * Every node maps a letter to a child node and marks whether a word ends
 * there. Words that share a prefix share the nodes of that prefix, so looking
 * up a word or a prefix takes one step per letter, however many words the trie
 * holds. Autocomplete and spell checkers use this shape.
 *
 * add, isWord, startsWith: O(L) for a word of length L. words: O(total letters).
 */

class Node {
  constructor() {
    this.keys = new Map()
    this.end = false
  }
}

export class Trie {
  constructor() {
    this.root = new Node()
  }

  add(word) {
    let node = this.root
    for (const letter of word) {
      if (!node.keys.has(letter)) node.keys.set(letter, new Node())
      node = node.keys.get(letter)
    }
    node.end = true
  }

  /** True when `word` was added (not just a prefix of an added word). */
  isWord(word) {
    return this.#nodeAt(word)?.end === true
  }

  /** True when some added word starts with `prefix`. */
  startsWith(prefix) {
    return this.#nodeAt(prefix) !== undefined
  }

  /** Every added word, in the order its letters were first inserted. */
  words() {
    const found = []
    const search = (node, prefix) => {
      if (node.end) found.push(prefix)
      for (const [letter, child] of node.keys) search(child, prefix + letter)
    }
    search(this.root, '')
    return found
  }

  #nodeAt(text) {
    let node = this.root
    for (const letter of text) {
      node = node.keys.get(letter)
      if (node === undefined) return undefined
    }
    return node
  }
}

if (import.meta.main) {
  const trie = new Trie()
  for (const word of ['saber', 'sabre', 'sbrea', 'archer', 'arcrec']) trie.add(word)
  console.log('words:            ', trie.words().join(', '))
  console.log('isWord("sabre"):  ', trie.isWord('sabre'))
  console.log('isWord("sab"):    ', trie.isWord('sab'))
  console.log('startsWith("arc"):', trie.startsWith('arc'))
}

/**
 * LeetCode 211. Design Add and Search Words Data Structure —
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/
 * Store words, and tell whether a pattern matches one of them, where "."
 * matches any single letter.
 *
 * Trie plus depth-first search: the words are stored letter by letter in a
 * trie, as in LeetCode 208. A letter in the pattern follows one child, like
 * an ordinary lookup. A "." has to try every child: the search branches
 * there, and backtracks to the next child when a branch fails.
 *
 * Time: addWord O(L) for a word of length L. search O(L) without dots; the
 * dots can make it visit the whole trie in the worst case.
 * Space: O(total letters) for the trie.
 * Learning source: https://leetcode.cn/problems/design-add-and-search-words-data-structure/solutions/755906/jian-dan-yi-dong-de-zi-dian-shu-by-dokom-4zlk/
 */

class Node {
  children = new Map()
  isWord = false
}

export class WordDictionary {
  #root = new Node()

  addWord(word) {
    let node = this.#root
    for (const letter of word) {
      if (!node.children.has(letter)) node.children.set(letter, new Node())
      node = node.children.get(letter)
    }
    node.isWord = true
  }

  search(pattern) {
    const match = (node, i) => {
      if (i === pattern.length) return node.isWord
      if (pattern[i] !== '.') {
        const child = node.children.get(pattern[i])
        return child !== undefined && match(child, i + 1)
      }
      for (const child of node.children.values()) {
        if (match(child, i + 1)) return true
      }
      return false
    }
    return match(this.#root, 0)
  }
}

if (import.meta.main) {
  const dictionary = new WordDictionary()
  for (const word of ['bad', 'dad', 'mad']) dictionary.addWord(word)
  console.log(['pad', 'bad', '.ad', 'b..'].map(pattern => `${pattern}: ${dictionary.search(pattern)}`).join(', '))
}

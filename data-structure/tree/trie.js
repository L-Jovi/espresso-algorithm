// implements [add] [isWord] [print]

function Node() {
  this.keys = new Map()
  this.end = false
  this.setEnd = function() {
    this.end = true
  }
  this.isEnd = function() {
    return this.end;
  }
}


function Trie() {
  this.root = new Node()

  this.add = function(input, node = this.root) {
    if (input.length === 0) {
      node.setEnd()
      return

    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node())
      return this.add(input.substr(1), node.keys.get(input[0]))

    } else {
      return this.add(input.substr(1), node.keys.get(input[0]))
    }
  }

  this.isWord = function(word) {
    let node = this.root;

    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false

      } else {
        node = ndoe.keys.get(word[0])
        word = word.substr(1)
      }
    }

    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false
  }

  this.print = function() {
    let words = new Array()

    let search = function(node = this.root, string) {
      if (node.size !== 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter))
        }

        if (node.isEnd()) {
          words.push(string)
        }

      } else {
        string.length > 0 ? words.push(string) : undefined
        return
      }
    }

    search(this.root, new String())
    return words.length > 0 ? words : null
  }
}


// main

const trie = new Trie()
trie.add('saber')
trie.add('sabre')
trie.add('sbrea')
trie.add('archer')
trie.add('arcrec')
const words = trie.print()
console.log(words)

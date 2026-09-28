import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../shared/random.js'
import { bfs } from './graph/bfs.js'
import { HashTable, hash, sumHash } from './hash-table/hash-table.js'
import { DoublyLinkedList } from './linked-list/doubly-linked-list.js'
import { LinkedList } from './linked-list/linked-list.js'
import { reverseList } from './linked-list/reverse-linked-list.js'
import { BinaryHeapPriorityQueue } from './queue/binary-heap-priority-queue.js'
import { CircularQueue } from './queue/circular-queue.js'
import { PriorityQueue } from './queue/priority-queue.js'
import { Queue } from './queue/queue.js'
import { MySet } from './set/set.js'
import { ArrayStack, Stack } from './stack/stack.js'
import { BST } from './tree/binary-search-tree.js'
import { array2BinaryTree, binaryTree2Array } from './tree/binary-tree-array.js'
import { countNodes } from './tree/count-nodes.js'
import { Trie } from './tree/trie.js'

const pick = (next, n) => Math.floor(next() * n)

describe('stacks', () => {
  for (const StackClass of [Stack, ArrayStack]) {
    it(`${StackClass.name} behaves like the end of an array under 5,000 random operations`, () => {
      const next = createRandom(1)
      const stack = new StackClass()
      const model = []
      for (let step = 0; step < 5000; step++) {
        if (next() < 0.55) {
          const value = pick(next, 100)
          stack.push(value)
          model.push(value)
        } else {
          assert.equal(stack.pop(), model.pop())
        }
        assert.equal(stack.peek(), model.at(-1))
        assert.equal(stack.size(), model.length)
        assert.equal(stack.isEmpty(), model.length === 0)
      }
    })

    it(`${StackClass.name} returns undefined when empty`, () => {
      const stack = new StackClass()
      assert.equal(stack.pop(), undefined)
      assert.equal(stack.peek(), undefined)
    })
  }
})

describe('queues', () => {
  for (const QueueClass of [Queue, CircularQueue]) {
    it(`${QueueClass.name} is first in, first out under 5,000 random operations`, () => {
      const next = createRandom(2)
      const queue = new QueueClass()
      const model = []
      for (let step = 0; step < 5000; step++) {
        if (model.length === 0 || next() < 0.55) {
          const value = pick(next, 100)
          queue.enqueue(value)
          model.push(value)
        } else {
          assert.equal(queue.dequeue(), model.shift())
        }
        assert.equal(queue.size(), model.length)
        assert.equal(queue.isEmpty(), model.length === 0)
        if (model.length > 0) assert.equal(queue.front(), model[0])
      }
    })
  }

  it('CircularQueue wraps around instead of growing forever', () => {
    const queue = new CircularQueue(4)
    for (let i = 0; i < 10_000; i++) {
      queue.enqueue(i)
      assert.equal(queue.dequeue(), i)
    }
    assert.ok(queue.capacity() <= 4, `capacity grew to ${queue.capacity()}`)
  })

  it('CircularQueue grows when full and shrinks when mostly empty', () => {
    const queue = new CircularQueue(2)
    for (let i = 0; i < 100; i++) queue.enqueue(i)
    assert.ok(queue.capacity() >= 100)
    for (let i = 0; i < 95; i++) queue.dequeue()
    assert.ok(queue.capacity() < 100)
    assert.deepEqual([95, 96, 97, 98, 99].map(() => queue.dequeue()), [95, 96, 97, 98, 99])
  })

  it('CircularQueue refuses to dequeue from an empty queue', () => {
    assert.throws(() => new CircularQueue().dequeue(), /empty/)
  })
})

describe('priority queues', () => {
  for (const QueueClass of [PriorityQueue, BinaryHeapPriorityQueue]) {
    it(`${QueueClass.name} serves the smallest priority first, ties in arrival order`, () => {
      const next = createRandom(3)
      const queue = new QueueClass()
      const model = [] // [value, priority, arrival]
      let arrival = 0
      for (let step = 0; step < 3000; step++) {
        if (model.length === 0 || next() < 0.6) {
          const value = `item${step}`
          const priority = pick(next, 10)
          queue.enqueue(value, priority)
          model.push([value, priority, arrival++])
        } else {
          model.sort((a, b) => a[1] - b[1] || a[2] - b[2])
          assert.equal(queue.dequeue(), model.shift()[0])
        }
        assert.equal(queue.size(), model.length)
      }
    })

    it(`${QueueClass.name} returns undefined when empty`, () => {
      assert.equal(new QueueClass().dequeue(), undefined)
      assert.equal(new QueueClass().front(), undefined)
    })
  }
})

describe('linked lists', () => {
  for (const ListClass of [LinkedList, DoublyLinkedList]) {
    it(`${ListClass.name} matches an array under 3,000 random operations`, () => {
      const next = createRandom(4)
      const list = new ListClass()
      const model = []
      for (let step = 0; step < 3000; step++) {
        const choice = next()
        const index = pick(next, model.length + 2) - 1 // includes -1 and length, both edge cases
        if (choice < 0.35) {
          const value = pick(next, 20)
          list.add(value)
          model.push(value)
        } else if (choice < 0.55) {
          const value = pick(next, 20)
          const ok = index >= 0 && index <= model.length
          assert.equal(list.addAt(index, value), ok)
          if (ok) model.splice(index, 0, value)
        } else if (choice < 0.75) {
          const expected = index >= 0 && index < model.length ? model.splice(index, 1)[0] : null
          assert.equal(list.removeAt(index), expected)
        } else if (choice < 0.85) {
          const value = pick(next, 20)
          const position = model.indexOf(value)
          const expected = position === -1 ? null : model.splice(position, 1)[0]
          assert.equal(list.remove(value), expected)
        } else {
          assert.equal(list.elementAt(index), index >= 0 && index < model.length ? model[index] : undefined)
          const value = pick(next, 20)
          assert.equal(list.indexOf(value), model.indexOf(value))
        }
        assert.deepEqual(list.toArray(), model)
        assert.equal(list.size(), model.length)
      }
    })

    it(`${ListClass.name} compares elements with ===`, () => {
      const list = new ListClass()
      list.add(3)
      assert.equal(list.indexOf('3'), -1)
    })
  }

  it('DoublyLinkedList keeps prev pointers and the tail consistent', () => {
    const next = createRandom(5)
    const list = new DoublyLinkedList()
    for (let step = 0; step < 2000; step++) {
      if (next() < 0.6) list.addAt(pick(next, list.size() + 1), step)
      else list.removeAt(pick(next, list.size() + 1))
      const backwards = []
      for (let node = list.tail(); node; node = node.prev) backwards.push(node.element)
      assert.deepEqual(backwards.reverse(), list.toArray())
      assert.equal(list.head()?.prev ?? null, null)
    }
  })

  it('reverseList reverses lists of every length from 0 to 8', () => {
    for (let n = 0; n <= 8; n++) {
      const list = new LinkedList()
      for (let i = 0; i < n; i++) list.add(i)
      const values = []
      for (let node = reverseList(list.head()); node; node = node.next) values.push(node.element)
      assert.deepEqual(values, Array.from({ length: n }, (_, i) => n - 1 - i))
    }
  })
})

describe('MySet', () => {
  it('agrees with the built-in Set and its ES2025 methods', () => {
    const next = createRandom(6)
    for (let round = 0; round < 500; round++) {
      const a = Array.from({ length: pick(next, 8) }, () => pick(next, 10))
      const b = Array.from({ length: pick(next, 8) }, () => pick(next, 10))
      const [mine, other] = [new MySet(a), new MySet(b)]
      const [native, nativeOther] = [new Set(a), new Set(b)]
      assert.deepEqual(mine.values(), [...native])
      assert.deepEqual(mine.union(other).values(), [...native.union(nativeOther)])
      // The spec lets the built-in intersection follow the smaller set's order.
      assert.deepEqual(mine.intersection(other).values().sort(), [...native.intersection(nativeOther)].sort())
      assert.deepEqual(mine.difference(other).values(), [...native.difference(nativeOther)])
      assert.equal(mine.subset(other), native.isSubsetOf(nativeOther))
    }
  })

  it('treats NaN as equal to itself, like the built-in Set', () => {
    const set = new MySet([NaN])
    assert.equal(set.add(NaN), false)
    assert.equal(set.size(), 1)
    assert.equal(set.remove(NaN), true)
    assert.equal(set.size(), 0)
  })

  it('does not let callers change it through values()', () => {
    const set = new MySet([1])
    set.values().push(2)
    assert.equal(set.has(2), false)
  })
})

describe('HashTable', () => {
  for (const bucketCount of [1, 4, 16]) {
    it(`matches a Map with ${bucketCount} bucket(s) under 3,000 random operations`, () => {
      const next = createRandom(7)
      const table = new HashTable(bucketCount)
      const model = new Map()
      for (let step = 0; step < 3000; step++) {
        const key = `k${pick(next, 40)}`
        const choice = next()
        if (choice < 0.5) {
          table.add(key, step)
          model.set(key, step)
        } else if (choice < 0.75) {
          assert.equal(table.remove(key), model.delete(key))
        } else {
          assert.equal(table.lookup(key), model.get(key))
        }
        assert.equal(table.size(), model.size)
      }
    })
  }

  it('puts every anagram in the same bucket with sumHash, but not with hash', () => {
    const anagrams = ['listen', 'silent', 'enlist', 'tinsel', 'inlets']
    assert.equal(new Set(anagrams.map(word => sumHash(word, 16))).size, 1)
    assert.ok(new Set(anagrams.map(word => hash(word, 16))).size > 1)
  })

  it('accepts non-string keys', () => {
    const table = new HashTable()
    table.add(42, 'answer')
    assert.equal(table.lookup(42), 'answer')
    assert.equal(table.lookup('42'), undefined)
  })
})

describe('BST', () => {
  it('keeps its values sorted under 3,000 random adds and removes, including the root', () => {
    const next = createRandom(8)
    const bst = new BST()
    const model = new Set()
    for (let step = 0; step < 3000; step++) {
      const value = pick(next, 200)
      if (next() < 0.6) {
        bst.add(value)
        model.add(value)
      } else {
        const target = next() < 0.3 && bst.root ? bst.root.data : value
        bst.remove(target)
        model.delete(target)
      }
      assert.deepEqual(bst.inOrder(), [...model].sort((a, b) => a - b))
    }
  })

  it('answers queries and handles an empty tree', () => {
    const bst = new BST()
    assert.equal(bst.find(3), null)
    assert.equal(bst.findMin(), null)
    for (const n of [4, 2, 6, 1, 3, 5, 7]) bst.add(n)
    assert.equal(bst.find(6).data, 6)
    assert.equal(bst.isPresent(8), false)
    assert.deepEqual([bst.findMin(), bst.findMax()], [1, 7])
    bst.remove(4)
    assert.equal(bst.isPresent(4), false)
  })

  it('adds 20,000 sorted values without overflowing the call stack', () => {
    const bst = new BST()
    for (let i = 0; i < 20_000; i++) bst.add(i)
    assert.equal(bst.inOrder().length, 20_000)
  })
})

describe('Trie', () => {
  it('finds words and prefixes', () => {
    const trie = new Trie()
    for (const word of ['saber', 'sabre', 'sbrea', 'archer', 'arcrec']) trie.add(word)
    assert.equal(trie.isWord('saber'), true)
    assert.equal(trie.isWord('sab'), false)
    assert.equal(trie.isWord('sabers'), false)
    assert.equal(trie.startsWith('sab'), true)
    assert.equal(trie.startsWith('x'), false)
    assert.deepEqual(trie.words().sort(), ['archer', 'arcrec', 'saber', 'sabre', 'sbrea'])
  })

  it('matches a list of words on random input', () => {
    const next = createRandom(9)
    const trie = new Trie()
    const added = new Set()
    for (let i = 0; i < 300; i++) {
      const word = Array.from({ length: 1 + pick(next, 5) }, () => 'abc'[pick(next, 3)]).join('')
      trie.add(word)
      added.add(word)
    }
    for (let i = 0; i < 300; i++) {
      const word = Array.from({ length: 1 + pick(next, 5) }, () => 'abc'[pick(next, 3)]).join('')
      assert.equal(trie.isWord(word), added.has(word))
      assert.equal(trie.startsWith(word), [...added].some(w => w.startsWith(word)))
    }
    assert.deepEqual(trie.words().sort(), [...added].sort())
  })
})

describe('binary tree arrays', () => {
  it('round-trips LeetCode level-order arrays', () => {
    for (const array of [[], [1], [1, 2, 3], [1, null, 2, 3], [3, 1, 4, 3, null, 1, 5], [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]]) {
      assert.deepEqual(binaryTree2Array(array2BinaryTree(array)), array)
    }
  })

  it('reads [null] as an empty tree', () => {
    assert.equal(array2BinaryTree([null]), null)
    assert.deepEqual(binaryTree2Array(null), [])
  })

  it('links children to the right parents', () => {
    const root = array2BinaryTree([1, null, 2, 3])
    assert.equal(root.left, null)
    assert.equal(root.right.val, 2)
    assert.equal(root.right.left.val, 3)
  })

  it('counts nodes', () => {
    const next = createRandom(10)
    for (let round = 0; round < 200; round++) {
      const array = [1, ...Array.from({ length: pick(next, 30) }, () => (next() < 0.3 ? null : pick(next, 100)))]
      const tree = array2BinaryTree(array)
      assert.equal(countNodes(tree), binaryTree2Array(tree).filter(value => value !== null).length)
    }
    assert.equal(countNodes(null), 0)
  })
})

describe('bfs', () => {
  it('finds the hop counts of the example graph', () => {
    const graph = [
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0],
    ]
    assert.deepEqual(bfs(graph, 1), [2, 0, 1, 3, Infinity])
  })

  it('returns shortest distances on 300 random graphs', () => {
    const next = createRandom(11)
    for (let round = 0; round < 300; round++) {
      const n = 1 + pick(next, 9)
      const graph = Array.from({ length: n }, () => Array.from({ length: n }, () => (next() < 0.25 ? 1 : 0)))
      const start = pick(next, n)
      const distance = bfs(graph, start)
      assert.equal(distance[start], 0)
      for (let u = 0; u < n; u++) {
        for (let v = 0; v < n; v++) {
          // No edge can shortcut a distance, and every reached vertex has a
          // neighbour one step closer: together these define shortest paths.
          if (graph[u][v] === 1 && distance[u] !== Infinity) assert.ok(distance[v] <= distance[u] + 1)
        }
        if (u !== start && distance[u] !== Infinity) {
          assert.ok(graph.some((row, w) => row[u] === 1 && distance[w] === distance[u] - 1))
        }
      }
    }
  })
})

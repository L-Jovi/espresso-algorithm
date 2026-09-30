import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { treeNode } from '../../data-structures/tree/binary-tree-array.js'
import { connect as iteration } from './iteration.js'
import { connect as preOrder } from './pre-order.js'

const approaches = { 'pre-order': preOrder, iteration }

// LeetCode's nodes start with next = null.
function perfectTree(depth, counter = { value: 1 }) {
  if (depth === 0) return null
  const node = { ...treeNode(counter.value++), next: null }
  node.left = perfectTree(depth - 1, counter)
  node.right = perfectTree(depth - 1, counter)
  return node
}

// LeetCode's output: each level read through the next pointers, then '#'.
function readByNext(root) {
  const out = []
  for (let leftmost = root; leftmost !== null; leftmost = leftmost.left) {
    for (let node = leftmost; node !== null; node = node.next) out.push(node.val)
    out.push('#')
  }
  return out
}

checkApproaches(approaches, [
  { input: [3], expected: [1, '#', 2, 5, '#', 3, 4, 6, 7, '#'] },
  { input: [1], expected: [1, '#'] },
  { input: [0], expected: [], label: 'empty tree' },
], { prepare: ([depth]) => [perfectTree(depth)], check: (actual, expected) => assert.deepEqual(readByNext(actual), expected) })

// Reference: the same listing from a breadth-first search, without next pointers.
function levelOrder(root) {
  const out = []
  for (let level = root === null ? [] : [root]; level.length > 0; level = level.flatMap(n => (n.left === null ? [] : [n.left, n.right]))) {
    out.push(...level.map(n => n.val), '#')
  }
  return out
}

it('both approaches link every level, left to right, of perfect trees up to depth 10', () => {
  for (let depth = 1; depth <= 10; depth++) {
    for (const connect of Object.values(approaches)) {
      const tree = perfectTree(depth)
      const expected = levelOrder(tree)
      assert.deepEqual(readByNext(connect(tree)), expected, `depth ${depth}`)
    }
  }
})

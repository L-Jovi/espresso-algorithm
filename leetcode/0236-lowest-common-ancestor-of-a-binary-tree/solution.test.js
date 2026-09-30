import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { randomTree } from '../../shared/random-tree.js'
import { lowestCommonAncestor } from './post-order.js'

// The path of nodes from the root to the node holding `value`, or null.
function pathTo(node, value) {
  if (node === null) return null
  if (node.val === value) return [node]
  const below = pathTo(node.left, value) ?? pathTo(node.right, value)
  return below === null ? null : [node, ...below]
}

// Cases give values; the solution receives the nodes.
const byValue = {
  prepare: ([array, p, q]) => {
    const root = array2BinaryTree(array)
    return [root, pathTo(root, p).at(-1), pathTo(root, q).at(-1)]
  },
  check: (actual, expected) => assert.equal(actual.val, expected),
}

checkApproaches({ 'post-order': lowestCommonAncestor }, [
  { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expected: 3 },
  { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4], expected: 5, label: 'one node is below the other' },
  { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 8], expected: 3 },
  { input: [[1, 2], 1, 2], expected: 1 },
  { input: [[1, 2, 3], 2, 2], expected: 2, label: 'p and q are the same node' },
], byValue)

it('agrees with comparing root-to-node paths on 2,000 random pairs', () => {
  const next = createRandom(236)
  for (let round = 0; round < 2000; round++) {
    const size = 1 + Math.floor(next() * 30)
    const root = randomTree(size, next)
    const [pPath, qPath] = [pathTo(root, 1 + Math.floor(next() * size)), pathTo(root, 1 + Math.floor(next() * size))]
    let common = 0
    while (common < Math.min(pPath.length, qPath.length) && pPath[common] === qPath[common]) common++
    assert.equal(lowestCommonAncestor(root, pPath.at(-1), qPath.at(-1)), pPath[common - 1])
  }
})

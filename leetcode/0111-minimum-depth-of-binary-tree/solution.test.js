import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { randomTree } from '../../shared/random-tree.js'
import { minDepth } from './bfs.js'

checkApproaches({ bfs: minDepth }, [
  { input: [[3, 9, 20, null, null, 15, 7]], expected: 2 },
  { input: [[2, null, 3, null, 4, null, 5, null, 6]], expected: 5, label: 'a path: the only leaf is at the bottom' },
  { input: [[]], expected: 0 },
  { input: [[1]], expected: 1 },
  { input: [[1, 2]], expected: 2, label: 'the root with one child is not a leaf' },
], { prepare: ([array]) => [array2BinaryTree(array)] })

// Reference: depth-first, looking at every path.
const minDepthOfAllPaths = node =>
  node === null ? 0
    : node.left === null ? 1 + minDepthOfAllPaths(node.right)
      : node.right === null ? 1 + minDepthOfAllPaths(node.left)
        : 1 + Math.min(minDepthOfAllPaths(node.left), minDepthOfAllPaths(node.right))

it('agrees with a depth-first search on 1,000 random trees', () => {
  const next = createRandom(111)
  for (let round = 0; round < 1000; round++) {
    const tree = randomTree(Math.floor(next() * 30), next)
    assert.equal(minDepth(tree), minDepthOfAllPaths(tree))
  }
})

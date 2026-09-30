import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { array2BinaryTree, binaryTree2Array } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { randomTree } from '../../shared/random-tree.js'
import { flatten } from './post-order.js'

// flatten() returns nothing; the test reads the rearranged tree.
const flattened = root => {
  flatten(root)
  return binaryTree2Array(root)
}

checkApproaches({ 'post-order': flattened }, [
  { input: [[1, 2, 5, 3, 4, null, 6]], expected: [1, null, 2, null, 3, null, 4, null, 5, null, 6] },
  { input: [[]], expected: [] },
  { input: [[0]], expected: [0] },
], { prepare: ([array]) => [array2BinaryTree(array)] })

const preorder = node => (node === null ? [] : [node.val, ...preorder(node.left), ...preorder(node.right)])

it('turns 1,000 random trees into right-only chains in preorder', () => {
  const next = createRandom(114)
  for (let round = 0; round < 1000; round++) {
    const tree = randomTree(Math.floor(next() * 30), next)
    const expected = preorder(tree)
    flatten(tree)
    const chain = []
    for (let node = tree; node !== null; node = node.right) {
      assert.equal(node.left, null)
      chain.push(node.val)
    }
    assert.deepEqual(chain, expected)
  }
})

import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { array2BinaryTree, binaryTree2Array } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { randomTree } from '../../shared/random-tree.js'
import { invertTree } from './recursion.js'

checkApproaches({ recursion: invertTree }, [
  { input: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
  { input: [[2, 1, 3]], expected: [2, 3, 1] },
  { input: [[]], expected: [] },
  { input: [[1, 2]], expected: [1, null, 2] },
], { prepare: ([array]) => [array2BinaryTree(array)], check: (actual, expected) => assert.deepEqual(binaryTree2Array(actual), expected) })

const inorder = node => (node === null ? [] : [...inorder(node.left), node.val, ...inorder(node.right)])

it('reverses the inorder of 1,000 random trees, and inverting twice restores them', () => {
  const next = createRandom(226)
  for (let round = 0; round < 1000; round++) {
    const tree = randomTree(Math.floor(next() * 30), next)
    const [original, order] = [binaryTree2Array(tree), inorder(tree)]
    const inverted = invertTree(tree)
    assert.deepEqual(inorder(inverted), order.toReversed())
    assert.deepEqual(binaryTree2Array(invertTree(inverted)), original)
  }
})

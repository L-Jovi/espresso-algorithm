import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { binaryTree2Array } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { randomTree } from '../../shared/random-tree.js'
import { buildTree } from './divide-and-conquer.js'

const asArray = { check: (actual, expected) => assert.deepEqual(binaryTree2Array(actual), expected) }

checkApproaches({ 'divide and conquer': buildTree }, [
  { input: [[9, 3, 15, 20, 7], [9, 15, 7, 20, 3]], expected: [3, 9, 20, null, null, 15, 7] },
  { input: [[-1], [-1]], expected: [-1] },
  { input: [[1, 2, 3], [3, 2, 1]], expected: [1, null, 2, null, 3], label: 'a path to the right' },
  { input: [[], []], expected: [] },
], asArray)

const inorder = node => (node === null ? [] : [...inorder(node.left), node.val, ...inorder(node.right)])
const postorder = node => (node === null ? [] : [...postorder(node.left), ...postorder(node.right), node.val])

it('rebuilds 1,000 random trees from their traversals', () => {
  const next = createRandom(106)
  for (let round = 0; round < 1000; round++) {
    const tree = randomTree(Math.floor(next() * 25), next)
    assert.deepEqual(binaryTree2Array(buildTree(inorder(tree), postorder(tree))), binaryTree2Array(tree))
  }
})

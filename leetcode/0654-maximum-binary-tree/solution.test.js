import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { binaryTree2Array } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { constructMaximumBinaryTree } from './divide-and-conquer.js'

checkApproaches({ 'divide and conquer': constructMaximumBinaryTree }, [
  { input: [[3, 2, 1, 6, 0, 5]], expected: [6, 3, 5, null, 2, 0, null, null, 1] },
  { input: [[3, 2, 1]], expected: [3, null, 2, null, 1] },
  { input: [[1]], expected: [1] },
], { check: (actual, expected) => assert.deepEqual(binaryTree2Array(actual), expected) })

const inorder = node => (node === null ? [] : [...inorder(node.left), node.val, ...inorder(node.right)])
const isHeap = node =>
  node === null || ([node.left, node.right].every(child => child === null || child.val < node.val) && isHeap(node.left) && isHeap(node.right))

// Keeping the array's order (inorder) and putting every parent above its
// children (a heap) describe exactly one tree, so the two checks suffice.
it('keeps the order of the array and puts larger numbers above on 1,000 random arrays', () => {
  const next = createRandom(654)
  for (let round = 0; round < 1000; round++) {
    const nums = [...new Set(Array.from({ length: 1 + Math.floor(next() * 30) }, () => Math.floor(next() * 1000)))]
    const tree = constructMaximumBinaryTree(nums)
    assert.deepEqual(inorder(tree), nums)
    assert.ok(isHeap(tree))
  }
})

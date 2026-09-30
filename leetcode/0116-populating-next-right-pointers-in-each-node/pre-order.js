/**
 * LeetCode 116. Populating Next Right Pointers in Each Node —
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 * In a perfect binary tree, point every node's `next` at the node to its
 * right on the same level, or leave it null at the end of a level.
 *
 * Pre-order over pairs of neighbors: the recursion takes two neighboring
 * nodes, links them, and then handles the three pairs of neighbors below
 * them: the children of the first node, the children of the second, and,
 * across the gap, the first node's right child with the second node's left
 * child. A recursion over single nodes could not link that last kind of
 * pair, whose nodes have different parents.
 *
 * The price: every call makes three more, and a node belongs to two pairs
 * (with its left and its right neighbor), so the pair of its children is
 * linked again from both. On a perfect tree of 4,095 nodes this makes
 * 265,720 calls to link 4,083 pairs (measured). iteration.js links each
 * pair once.
 *
 * Time: O(n^log₂3), about O(n^1.58). Space: O(log n) for the recursion.
 * Learning source: https://labuladong.online/zh/algo/data-structure/binary-tree-part1/
 */

import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'

export function connect(root) {
  if (root !== null) connectPair(root.left, root.right)
  return root
}

function connectPair(left, right) {
  if (left === null || right === null) return
  left.next = right
  connectPair(left.left, left.right)
  connectPair(right.left, right.right)
  connectPair(left.right, right.left)
}

if (import.meta.main) {
  const root = connect(array2BinaryTree([1, 2, 3, 4, 5, 6, 7]))
  console.log(root.left.right.next.val, 'is to the right of', root.left.right.val)
}

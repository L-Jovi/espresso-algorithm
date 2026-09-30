/**
 * LeetCode 114. Flatten Binary Tree to Linked List —
 * https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 * Rearrange a binary tree, in place, into a chain of right children that
 * visits the nodes in preorder; every left child becomes null.
 *
 * Post-order: flatten both subtrees first, then fix the node itself. Its
 * flattened left subtree moves over to the right, and the flattened right
 * subtree hangs off the end of it. Finding that end means walking down the
 * chain that was just moved.
 *
 * Time: O(n²) in the worst case, a tree leaning to the left, because of
 * those walks; O(n log n) for a balanced tree. Space: O(h) for the
 * recursion on a tree of height h.
 * Learning source: https://labuladong.online/zh/algo/data-structure/binary-tree-part1/
 */

import { array2BinaryTree, binaryTree2Array } from '../../data-structures/tree/binary-tree-array.js'

export function flatten(root) {
  if (root === null) return
  flatten(root.left)
  flatten(root.right)
  const right = root.right
  root.right = root.left
  root.left = null
  let tail = root
  while (tail.right !== null) tail = tail.right
  tail.right = right
}

if (import.meta.main) {
  const root = array2BinaryTree([1, 2, 5, 3, 4, null, 6])
  flatten(root)
  console.log(binaryTree2Array(root))
}

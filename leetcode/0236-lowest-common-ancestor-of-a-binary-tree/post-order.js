/**
 * LeetCode 236. Lowest Common Ancestor of a Binary Tree —
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * Find the deepest node that has both p and q in its subtree; a node counts
 * as being in its own subtree. Both nodes are in the tree.
 *
 * Post-order: ask both subtrees first, then decide. A call returns p or q
 * if it finds one of them, the answer if it finds both, and null if it
 * finds neither. The first node that hears back from both sides has p on
 * one side and q on the other: it is the lowest common ancestor. A node
 * that is p or q itself returns at once. Whether or not the other one lies
 * below it, it is the answer for its subtree.
 *
 * Time: O(n). Space: O(h) for the recursion on a tree of height h.
 */

import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'

export function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  if (left !== null && right !== null) return root
  return left ?? right
}

if (import.meta.main) {
  const root = array2BinaryTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4])
  console.log(lowestCommonAncestor(root, root.left, root.left.right.right).val) // 5 and 4 → 5
}

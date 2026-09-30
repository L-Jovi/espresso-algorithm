/**
 * LeetCode 226. Invert Binary Tree — https://leetcode.com/problems/invert-binary-tree/
 * Mirror a binary tree: swap the left and right child of every node.
 *
 * Recursion: invert both subtrees, then swap them. Every node is visited
 * once, and the order does not matter; swapping first and then inverting
 * the two subtrees gives the same tree.
 *
 * Time: O(n). Space: O(h) for the recursion on a tree of height h.
 * Learning source: https://labuladong.online/zh/algo/data-structure/binary-tree-part1/
 */

import { array2BinaryTree, binaryTree2Array } from '../../data-structures/tree/binary-tree-array.js'

export function invertTree(root) {
  if (root === null) return null
  const left = invertTree(root.left)
  root.left = invertTree(root.right)
  root.right = left
  return root
}

if (import.meta.main) console.log(binaryTree2Array(invertTree(array2BinaryTree([4, 2, 7, 1, 3, 6, 9]))))

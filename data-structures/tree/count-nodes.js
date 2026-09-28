/**
 * Count the nodes of a binary tree.
 *
 * The count of a tree is the count of its left subtree, plus the count of its
 * right subtree, plus one for the root; an empty tree counts zero. Many tree
 * questions have this shape: answer for both subtrees, then combine.
 *
 * Time: O(n). Space: O(h) for the recursion, where h is the height. For a
 * complete binary tree, LeetCode 222 shows an O(log² n) method that measures
 * the heights of the left and right edges instead.
 */
import { array2BinaryTree } from './binary-tree-array.js'

export function countNodes(root) {
  if (!root) return 0
  return countNodes(root.left) + countNodes(root.right) + 1
}

if (import.meta.main) {
  const tree = array2BinaryTree([1, 2, 3, 4, null, 6, 7, null, 8])
  console.log('nodes:', countNodes(tree))
}

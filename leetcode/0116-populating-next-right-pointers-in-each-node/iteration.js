/**
 * LeetCode 116. Populating Next Right Pointers in Each Node —
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 * In a perfect binary tree, point every node's `next` at the node to its
 * right on the same level, or leave it null at the end of a level.
 *
 * Iteration, one level at a time: once a level is linked, its `next`
 * pointers make it a linked list that can be walked from its leftmost node.
 * Walk each level that way and link the level below it: a node's left child
 * points to its right child, and its right child points to the left child
 * of the node's `next`. Every pair is linked exactly once, and no queue or
 * recursion is needed; this is the problem's constant-space follow-up.
 *
 * Time: O(n). Space: O(1).
 */

import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'

export function connect(root) {
  for (let leftmost = root; leftmost !== null && leftmost.left !== null; leftmost = leftmost.left) {
    // != null also stops at undefined, for nodes built without a next field.
    for (let node = leftmost; node != null; node = node.next) {
      node.left.next = node.right
      node.right.next = node.next?.left ?? null
    }
  }
  return root
}

if (import.meta.main) {
  const root = connect(array2BinaryTree([1, 2, 3, 4, 5, 6, 7]))
  console.log(root.left.right.next.val, 'is to the right of', root.left.right.val)
}

/**
 * LeetCode 314. Binary Tree Vertical Order Traversal (Premium) —
 * https://leetcode.com/problems/binary-tree-vertical-order-traversal/
 * List a binary tree's values column by column, from left to right. The
 * root is in column 0; a left child is one column to the left of its
 * parent, a right child one column to the right. Inside a column, list the
 * values from top to bottom, and values in the same row from left to right.
 *
 * Breadth-first search: visiting the nodes level by level, left to right,
 * produces exactly the order wanted inside each column, so each value is
 * simply appended to its column's list. The columns in use form one
 * unbroken range (every step moves one column), so knowing the leftmost
 * and rightmost column is enough to put the lists in order; no sorting.
 *
 * Time: O(n). Space: O(n).
 * Learning source: https://leetcode.cn/problems/binary-tree-vertical-order-traversal/solutions/630901/c-python3-dai-ma-jian-ji-ceng-xu-bian-li-lf5n/
 */

import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'

export function verticalOrder(root) {
  if (root === null) return []
  const columns = new Map()
  let [leftmost, rightmost] = [0, 0]
  const queue = [[root, 0]]
  // A read position instead of queue.shift(), which moves every item.
  for (let head = 0; head < queue.length; head++) {
    const [node, column] = queue[head]
    if (!columns.has(column)) columns.set(column, [])
    columns.get(column).push(node.val)
    leftmost = Math.min(leftmost, column)
    rightmost = Math.max(rightmost, column)
    if (node.left !== null) queue.push([node.left, column - 1])
    if (node.right !== null) queue.push([node.right, column + 1])
  }
  return Array.from({ length: rightmost - leftmost + 1 }, (_, i) => columns.get(leftmost + i))
}

if (import.meta.main) console.log(verticalOrder(array2BinaryTree([3, 9, 20, null, null, 15, 7])))

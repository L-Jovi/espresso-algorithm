/**
 * LeetCode 111. Minimum Depth of Binary Tree —
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/
 * Return the number of nodes on the shortest path from the root down to a
 * leaf, a node without children.
 *
 * Breadth-first search: visit the tree one level at a time. The first leaf
 * found is on the shallowest level, so the search stops there and never
 * looks at the deeper levels. A depth-first search has to explore every
 * path before it can be sure.
 *
 * Time: O(n) in the worst case. Space: O(w) for the widest level.
 */

import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'

export function minDepth(root) {
  if (root === null) return 0
  let level = [root]
  for (let depth = 1; ; depth++) {
    const below = []
    for (const node of level) {
      if (node.left === null && node.right === null) return depth
      if (node.left !== null) below.push(node.left)
      if (node.right !== null) below.push(node.right)
    }
    level = below
  }
}

if (import.meta.main) console.log(minDepth(array2BinaryTree([3, 9, 20, null, null, 15, 7])))

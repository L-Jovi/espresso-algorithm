/**
 * LeetCode 105. Construct Binary Tree from Preorder and Inorder Traversal —
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * Rebuild a binary tree with distinct values from its preorder and inorder
 * traversals.
 *
 * Divide and conquer: preorder lists the root, then the left subtree, then
 * the right one; inorder lists the left subtree, then the root, then the
 * right one. So preorder's first value is the root, and finding it in
 * inorder tells how large the left subtree is, which splits both lists into
 * the two subtrees; each is rebuilt the same way. A map from value to
 * inorder position finds the root in O(1). Searching the inorder list
 * instead costs O(n) per node, O(n²) for a tree that is a single path.
 *
 * Time: O(n). Space: O(n) for the map and the recursion.
 * Learning source: https://labuladong.online/zh/algo/data-structure/binary-tree-part2/
 */

import { binaryTree2Array, treeNode } from '../../data-structures/tree/binary-tree-array.js'

export function buildTree(preorder, inorder) {
  const inorderIndex = new Map(inorder.map((value, i) => [value, i]))

  // The subtree whose preorder starts at preStart and whose inorder is inorder[inStart..inEnd].
  function build(preStart, inStart, inEnd) {
    if (inStart > inEnd) return null
    const rootValue = preorder[preStart]
    const rootIndex = inorderIndex.get(rootValue)
    const leftSize = rootIndex - inStart
    return treeNode(
      rootValue,
      build(preStart + 1, inStart, rootIndex - 1),
      build(preStart + 1 + leftSize, rootIndex + 1, inEnd),
    )
  }

  return build(0, 0, inorder.length - 1)
}

if (import.meta.main) console.log(binaryTree2Array(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])))

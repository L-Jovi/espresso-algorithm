/**
 * LeetCode 106. Construct Binary Tree from Inorder and Postorder Traversal —
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * Rebuild a binary tree with distinct values from its inorder and postorder
 * traversals.
 *
 * Divide and conquer, the mirror image of LeetCode 105: postorder lists the
 * left subtree, then the right one, then the root, so its last value is the
 * root. Finding the root in inorder tells how large the right subtree is,
 * which splits both lists into the two subtrees; each is rebuilt the same
 * way. A map from value to inorder position finds the root in O(1).
 *
 * Time: O(n). Space: O(n) for the map and the recursion.
 * Learning source: https://labuladong.online/zh/algo/data-structure/binary-tree-part2/
 */

import { binaryTree2Array, treeNode } from '../../data-structures/tree/binary-tree-array.js'

export function buildTree(inorder, postorder) {
  const inorderIndex = new Map(inorder.map((value, i) => [value, i]))

  // The subtree whose postorder ends at postEnd and whose inorder is inorder[inStart..inEnd].
  function build(postEnd, inStart, inEnd) {
    if (inStart > inEnd) return null
    const rootValue = postorder[postEnd]
    const rootIndex = inorderIndex.get(rootValue)
    const rightSize = inEnd - rootIndex
    return treeNode(
      rootValue,
      build(postEnd - 1 - rightSize, inStart, rootIndex - 1),
      build(postEnd - 1, rootIndex + 1, inEnd),
    )
  }

  return build(postorder.length - 1, 0, inorder.length - 1)
}

if (import.meta.main) console.log(binaryTree2Array(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])))

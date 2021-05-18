/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const constructMaximumBinaryTree = (nums) => {
  // find max value
  const root = {}
  root.val = max

  const leftItems = []
  const rightItems = []

  root.left = constructMaximumBinaryTree(leftItems)
  root.right = constructMaximumBinaryTree(rightItems)

  return root
}

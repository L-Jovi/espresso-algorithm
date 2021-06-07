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
  if (nums.length === 0) {
    return null
  }

  // find max value
  const root = {}
  const max = Math.max(...nums)
  root.val = max
  const indexMax = nums.findIndex(v => v === max)

  const leftItems = nums.slice(0, indexMax)
  const rightItems = nums.slice(indexMax + 1, nums.length)

  root.left = constructMaximumBinaryTree(leftItems)
  root.right = constructMaximumBinaryTree(rightItems)

  return root
}

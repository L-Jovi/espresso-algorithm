/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * https://labuladong.github.io/algo/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%B3%BB%E5%88%97/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%B3%BB%E5%88%971.html
 */
const flatten = (root) => {
  if (!root) {
    return
  }

  flatten(root.left)
  flatten(root.right)

  const left = root.left
  const right = root.right

  root.left = null
  root.right = left

  let node = root
  while (node.right) {
    node = node.right
  }
  node.right = right
}

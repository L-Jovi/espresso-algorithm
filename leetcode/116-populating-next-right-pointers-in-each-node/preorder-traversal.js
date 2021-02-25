/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 * https://labuladong.github.io/algo/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%B3%BB%E5%88%97/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%B3%BB%E5%88%971.html
 */
const connect = (root) => {
  if (!root) {
    return null
  }

  const connect2Nodes = (node1, node2) => {
    if (!node1 || !node2) {
      return
    }

    node1.next = node2

    // same parent
    connect2Nodes(node1.left, node1.right)
    connect2Nodes(node2.left, node2.right)

    // different parent
    connect2Nodes(node1.right, node2.left)
  }

  connect2Nodes(root.left, root.right)
  return root
}

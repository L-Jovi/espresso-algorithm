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
 * @return {number[][]}
 * https://leetcode-cn.com/problems/binary-tree-vertical-order-traversal/solution/c-python3-dai-ma-jian-ji-ceng-xu-bian-li-lf5n/
 */
const verticalOrder = (root) => {
  // base case
  if (!root) {
    return []
  }

  // record axis info
  // eg: { '-1': [9], '0': [3, 15], '1': [20] }
  const axisMap = {}
  const queue = [ [root, 0] ]

  while (queue.length > 0) {
    const [ node, index ] = queue.shift()

    if (axisMap[index]) {
      axisMap[index].push(node.val)
    } else {
      axisMap[index] = [node.val]
    }

    if (node.left) {
      queue.push([node.left, index - 1])
    }
    if (node.right) {
      queue.push([node.right, index + 1])
    }
  }

  console.log(axisMap)

  // transform map to array
  const keys = Object.keys(axisMap).map(k => k * 1)
  keys.sort((a, b) => a - b)
  return keys.map(k => axisMap[k])
}


// const root = [3, 9, 20, null, null, 15, 7]
const root = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15,
    },
    right: {
      val: 7
    }
  },
}
console.log(verticalOrder(root))

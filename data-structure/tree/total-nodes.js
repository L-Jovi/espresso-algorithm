/**
 * getTotalNodes
 *
 * @param {Node} root
 * @returns {Number}
 */
const getTotalNodes = (root) => {
  const count = (node) => {
    if (!node) {
      return 0
    }

    const leftCount = count(node.left)
    const rightCount = count(node.right)
    return leftCount + rightCount + 1
  }

  return count(root)
}


const root = {
  left: {
    left: {
      left: {},
      right: {
        left: {
          right: {}
        }
      }
    }
  },
  right: {
    left: {},
    right: {
      left: {
        right: {}
      }
    }
  }
}
console.log(getTotalNodes(root))

const getTreeNode = (value, left = null, right = null) => {
  return {
    value,
    left,
    right,
  }
}

/**
 * array2BinaryTree
 *
 * @param {Number} array
 * @description Only fit full binary tree
 * @returns {Node}
 */
// const array2BinaryTree = (array) => {
//   const traverse = (index) => {
//     if (index > array.length) {
//       return null
//     }
//
//     const node = {}
//     const value = array[index - 1]
//     node.value = value
//     node.left = traverse(index * 2)
//     node.right = traverse(index * 2 + 1)
//
//     return node
//   }
//
//   return traverse(1)
// }


/**
 * array2BinaryTree
 *
 * @param {Number} array
 * @description Fit common binary tree
 * @returns {Node}
 */
const array2BinaryTree = (array) => {
  if (array.length === 0) {
    return null
  }

  const root = getTreeNode(array[0])
  const queue = []
  queue.push(root)

  let isLeft = true

  for (let i = 1; i < array.length; i++) {
    const node = queue[0]
    if (isLeft) {
      if (array[i] !== null) {
        node.left = getTreeNode(array[i])
        queue.push(node.left)
      }
      isLeft = false

    } else {
      if (array[i] !== null) {
        node.right = getTreeNode(array[i])
        queue.push(node.right)
      }
      queue.shift()
      isLeft = true
    }
  }

  return root
}


/**
 * binaryTree2Array (BFS)
 *
 * @param {Node} root
 * @returns {Number[]}
 */
const binaryTree2Array = (root) => {
  const array = []
  const queue = []
  queue.push(root)

  while (queue.length) {
    const size = queue.length

    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      array.push(node.value)

      if (node.left) {
        queue.push(node.left)
      }

      if (node.right) {
        queue.push(node.right)
      }
    }
  }

  return array
}


const array1 = [1, 2, 3, 4, 5, 6, 7]
const array2 = [3, 1, 4, 3, null, 1, 5]

const tree1 = array2BinaryTree(array1)
const tree2 = array2BinaryTree(array2)
console.log('tree1: ', tree1)
console.log('tree2: ', tree2)

console.log('array1: ', binaryTree2Array(tree1))
console.log('array2: ', binaryTree2Array(tree2))

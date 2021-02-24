/**
 * array2BinaryTree
 *
 * @param {Number} array
 * @returns {Node}
 */
const array2BinaryTree = (array) => {
  const traverse = (index) => {
    if (index > array.length) {
      return null
    }

    const node = {}
    const value = array[index - 1]
    node.value = value
    node.left = traverse(index * 2)
    node.right = traverse(index * 2 + 1)

    return node
  }

  return traverse(1)
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


const array = [1, 2, 3, 4, 5, 6, 7]
const tree = array2BinaryTree(array)
console.log(tree)
console.log(binaryTree2Array(tree))

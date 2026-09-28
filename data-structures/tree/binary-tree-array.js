/**
 * Convert between a binary tree and LeetCode's level-order array.
 *
 * LeetCode writes a tree as its nodes level by level, left to right, with
 * `null` for a missing child and without trailing nulls: [3, 1, 4, 3, null, 1, 5].
 * Children are only listed for nodes that exist, so the array is not the
 * "index i has children 2i + 1 and 2i + 2" layout of a heap; a queue of
 * parents, filled level by level, decides whose child each value is.
 *
 * Nodes use `val`, `left` and `right`, the shape LeetCode passes to solutions,
 * and the LeetCode tests in this repository build their trees with these
 * functions. Both functions are O(n).
 */

export const treeNode = (val, left = null, right = null) => ({ val, left, right })

/**
 * @param {(number | null)[]} array level order with nulls
 * @returns the root, or null for an empty tree
 */
export function array2BinaryTree(array) {
  if (array.length === 0 || array[0] === null) return null
  const root = treeNode(array[0])
  const parents = [root]
  let head = 0
  let i = 1
  // Stop when no parent is left: values after that have nowhere to go.
  while (i < array.length && head < parents.length) {
    const parent = parents[head++]
    if (array[i] !== null) parents.push((parent.left = treeNode(array[i])))
    i++
    if (i < array.length && array[i] !== null) parents.push((parent.right = treeNode(array[i])))
    i++
  }
  return root
}

/**
 * @param root the root node, or null
 * @returns {(number | null)[]} level order with nulls, trailing nulls removed
 */
export function binaryTree2Array(root) {
  const array = []
  const queue = [root]
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head]
    if (node === null) {
      array.push(null)
    } else {
      array.push(node.val)
      queue.push(node.left, node.right)
    }
  }
  while (array.at(-1) === null) array.pop()
  return array
}

if (import.meta.main) {
  const tree = array2BinaryTree([3, 1, 4, 3, null, 1, 5])
  console.log('root:', tree.val, ' left:', tree.left.val, ' right:', tree.right.val)
  console.log('back to an array:', JSON.stringify(binaryTree2Array(tree)))
}

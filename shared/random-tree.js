/**
 * Random binary trees for the tests of the LeetCode tree problems.
 *
 * Every node splits the nodes below it between its left and right subtree
 * at a uniformly random point, so the shapes range from balanced trees to
 * a single path. The values are 1 … size in a random order, all distinct,
 * because several problems (105, 106, 236) need distinct values.
 */

import { treeNode } from '../data-structures/tree/binary-tree-array.js'
import { swap } from './swap.js'

/**
 * @param {number} size how many nodes
 * @param {() => number} next a random source, such as createRandom(seed)
 * @returns the root, or null when size is 0
 */
export function randomTree(size, next) {
  const values = Array.from({ length: size }, (_, i) => i + 1)
  for (let i = size - 1; i > 0; i--) swap(values, i, Math.floor(next() * (i + 1)))

  let used = 0
  function build(count) {
    if (count === 0) return null
    const leftCount = Math.floor(next() * count)
    const node = treeNode(values[used++])
    node.left = build(leftCount)
    node.right = build(count - 1 - leftCount)
    return node
  }

  return build(size)
}

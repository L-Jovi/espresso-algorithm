import { it } from 'node:test'
import assert from 'node:assert/strict'
import { checkApproaches } from '../../shared/check.js'
import { array2BinaryTree } from '../../data-structures/tree/binary-tree-array.js'
import { createRandom } from '../../shared/random.js'
import { randomTree } from '../../shared/random-tree.js'
import { verticalOrder } from './bfs.js'

checkApproaches({ bfs: verticalOrder }, [
  { input: [[3, 9, 20, null, null, 15, 7]], expected: [[9], [3, 15], [20], [7]] },
  { input: [[3, 9, 8, 4, 0, 1, 7]], expected: [[4], [9], [3, 0, 1], [8], [7]] },
  { input: [[3, 9, 8, 4, 0, 1, 7, null, null, null, 2, 5]], expected: [[4], [9, 5], [3, 0, 1], [8, 2], [7]] },
  { input: [[]], expected: [] },
], { prepare: ([array]) => [array2BinaryTree(array)] })

// Reference: in preorder, nodes of one row come left to right, so a stable
// sort by column, then row, gives the same order as the breadth-first search.
function verticalOrderBySorting(root) {
  const seen = []
  const visit = (node, row, column) => {
    if (node === null) return
    seen.push({ row, column, val: node.val })
    visit(node.left, row + 1, column - 1)
    visit(node.right, row + 1, column + 1)
  }
  visit(root, 0, 0)
  const groups = Map.groupBy(seen.toSorted((a, b) => a.column - b.column || a.row - b.row), item => item.column)
  return [...groups.values()].map(items => items.map(item => item.val))
}

it('agrees with sorting a preorder walk on 1,000 random trees', () => {
  const next = createRandom(314)
  for (let round = 0; round < 1000; round++) {
    const tree = randomTree(Math.floor(next() * 30), next)
    assert.deepEqual(verticalOrder(tree), verticalOrderBySorting(tree))
  }
})

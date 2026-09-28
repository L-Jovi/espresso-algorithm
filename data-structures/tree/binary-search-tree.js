/**
 * Binary search tree (BST).
 *
 * Every node's left subtree holds smaller values and its right subtree holds
 * larger ones, so a search can drop half of a balanced tree at each step.
 * Duplicates are ignored.
 *
 * Removing a node with two children uses its in-order successor: copy the
 * smallest value of the right subtree into the node, then remove that value
 * from the right subtree. The result keeps the ordering rule.
 *
 * This tree does not rebalance itself. Values added in sorted order turn it
 * into a chain, and every operation becomes O(n); self-balancing trees
 * (AVL, red-black) exist to prevent that.
 *
 * add, find, isPresent, remove, findMin, findMax: O(h) for height h, which is
 * O(log n) when balanced and O(n) in the worst case. inOrder: O(n).
 */

export class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

export class BST {
  constructor() {
    this.root = null
  }

  add(data) {
    const node = new Node(data)
    if (this.root === null) {
      this.root = node
      return
    }
    let current = this.root
    for (;;) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = node
          return
        }
        current = current.left
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = node
          return
        }
        current = current.right
      } else {
        return
      }
    }
  }

  findMin() {
    let current = this.root
    if (current === null) return null
    while (current.left) current = current.left
    return current.data
  }

  findMax() {
    let current = this.root
    if (current === null) return null
    while (current.right) current = current.right
    return current.data
  }

  /** The node that holds `data`, or null. */
  find(data) {
    let current = this.root
    while (current !== null && current.data !== data) {
      current = data < current.data ? current.left : current.right
    }
    return current
  }

  isPresent(data) {
    return this.find(data) !== null
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) return null
      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      }
      if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      }
      if (node.left === null) return node.right
      if (node.right === null) return node.left
      // Two children: take the smallest value of the right subtree.
      let successor = node.right
      while (successor.left !== null) successor = successor.left
      node.data = successor.data
      node.right = removeNode(node.right, successor.data)
      return node
    }
    // Removing the root can replace it, so the result must be stored.
    this.root = removeNode(this.root, data)
  }

  /** All values in ascending order (left subtree, node, right subtree). */
  inOrder() {
    const values = []
    const stack = []
    let current = this.root
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current)
        current = current.left
      }
      current = stack.pop()
      values.push(current.data)
      current = current.right
    }
    return values
  }
}

if (import.meta.main) {
  const bst = new BST()
  for (const n of [4, 2, 6, 1, 3, 5, 7]) bst.add(n)
  bst.remove(4)
  console.log('in order after removing the root 4:', bst.inOrder().join(' '))
  console.log('min:', bst.findMin(), ' max:', bst.findMax(), ' has 4:', bst.isPresent(4))
}

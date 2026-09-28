/**
 * Doubly linked list.
 *
 * Every node points to the next node and to the previous one, and the list
 * keeps both ends. Adding or removing at either end is O(1), and a walk to
 * position i starts from whichever end is closer. The price is one more
 * pointer per node, and every insertion or removal must update four links
 * instead of two.
 *
 * add, addAt(0), removeAt(0), removeAt(size - 1): O(1).
 * Other positions, indexOf, elementAt, remove: O(n).
 */

export class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}

export class DoublyLinkedList {
  #head = null
  #tail = null
  #length = 0

  size() {
    return this.#length
  }

  head() {
    return this.#head
  }

  tail() {
    return this.#tail
  }

  isEmpty() {
    return this.#length === 0
  }

  add(element) {
    this.addAt(this.#length, element)
  }

  remove(element) {
    return this.removeAt(this.indexOf(element))
  }

  indexOf(element) {
    let index = 0
    for (let current = this.#head; current; current = current.next, index++) {
      if (current.element === element) return index
    }
    return -1
  }

  elementAt(index) {
    return this.#nodeAt(index)?.element
  }

  /** Insert `element` so that it ends up at `index`; false if index is out of range. */
  addAt(index, element) {
    if (!(index >= 0 && index <= this.#length)) return false
    const node = new Node(element)

    if (this.#length === 0) {
      this.#head = node
      this.#tail = node
    } else if (index === 0) {
      // node <-> old head
      node.next = this.#head
      this.#head.prev = node
      this.#head = node
    } else if (index === this.#length) {
      // old tail <-> node
      node.prev = this.#tail
      this.#tail.next = node
      this.#tail = node
    } else {
      // previous <-> node <-> current
      const current = this.#nodeAt(index)
      const previous = current.prev
      node.prev = previous
      node.next = current
      previous.next = node
      current.prev = node
    }

    this.#length++
    return true
  }

  /** Remove and return the element at `index`, or null when it is out of range. */
  removeAt(index) {
    const node = this.#nodeAt(index)
    if (!node) return null

    if (node.prev) node.prev.next = node.next
    else this.#head = node.next
    if (node.next) node.next.prev = node.prev
    else this.#tail = node.prev

    this.#length--
    return node.element
  }

  toArray() {
    const elements = []
    for (let current = this.#head; current; current = current.next) elements.push(current.element)
    return elements
  }

  /** Walk from the nearer end; undefined when the index is out of range. */
  #nodeAt(index) {
    if (!(index >= 0 && index < this.#length)) return undefined
    if (index < this.#length / 2) {
      let current = this.#head
      for (let i = 0; i < index; i++) current = current.next
      return current
    }
    let current = this.#tail
    for (let i = this.#length - 1; i > index; i--) current = current.prev
    return current
  }
}

if (import.meta.main) {
  const list = new DoublyLinkedList()
  for (const letter of ['a', 'c', 'd']) list.add(letter)
  list.addAt(1, 'b')
  list.removeAt(3)
  console.log('list:', list.toArray().join(' ⇄ '))
  console.log('tail:', list.tail().element)
}

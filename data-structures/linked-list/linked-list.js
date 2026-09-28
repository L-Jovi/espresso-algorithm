/**
 * Singly linked list.
 *
 * Each node holds an element and a pointer to the next node. The list keeps
 * only the head, so reaching position i means following i pointers, and
 * adding at the end walks the whole list. In exchange, inserting or removing
 * next to a node you already hold never moves other items, unlike an array.
 *
 * add, indexOf, elementAt, addAt, removeAt, remove: O(n).
 * size, head, isEmpty: O(1).
 */

export class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

export class LinkedList {
  #head = null
  #length = 0

  size() {
    return this.#length
  }

  /** The first node (not its element), or null. */
  head() {
    return this.#head
  }

  isEmpty() {
    return this.#length === 0
  }

  /** Append an element at the end. */
  add(element) {
    const node = new Node(element)
    if (this.#head === null) {
      this.#head = node
    } else {
      let current = this.#head
      while (current.next) current = current.next
      current.next = node
    }
    this.#length++
  }

  /** Remove the first occurrence of `element`; return it, or null if absent. */
  remove(element) {
    return this.removeAt(this.indexOf(element))
  }

  /** Position of the first node whose element is `element` (===), or -1. */
  indexOf(element) {
    let index = 0
    for (let current = this.#head; current; current = current.next, index++) {
      if (current.element === element) return index
    }
    return -1
  }

  /** The element at `index`, or undefined when the index is out of range. */
  elementAt(index) {
    if (!(index >= 0 && index < this.#length)) return undefined
    let current = this.#head
    for (let i = 0; i < index; i++) current = current.next
    return current.element
  }

  /** Insert `element` so that it ends up at `index`; false if index is out of range. */
  addAt(index, element) {
    if (!(index >= 0 && index <= this.#length)) return false
    const node = new Node(element)
    if (index === 0) {
      node.next = this.#head
      this.#head = node
    } else {
      let previous = this.#head
      for (let i = 1; i < index; i++) previous = previous.next
      node.next = previous.next
      previous.next = node
    }
    this.#length++
    return true
  }

  /** Remove and return the element at `index`, or null when it is out of range. */
  removeAt(index) {
    if (!(index >= 0 && index < this.#length)) return null
    let removed = this.#head
    if (index === 0) {
      this.#head = removed.next
    } else {
      let previous = this.#head
      for (let i = 1; i < index; i++) previous = previous.next
      removed = previous.next
      previous.next = removed.next
    }
    this.#length--
    return removed.element
  }

  toArray() {
    const elements = []
    for (let current = this.#head; current; current = current.next) elements.push(current.element)
    return elements
  }
}

if (import.meta.main) {
  const list = new LinkedList()
  list.add(5)
  list.add(3)
  list.addAt(1, 4)
  console.log('list:      ', list.toArray().join(' → '))
  console.log('indexOf(3):', list.indexOf(3))
}

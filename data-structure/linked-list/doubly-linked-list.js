/*
 * @Description: doubly linked list
 * @FileName: doubly-linked-list.js
 * @Implements: [size] [head] [add] [remove] [indexOf] [elementAt] [addAt] [removeAt]
 */

class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}


class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  addAt(index, element) {
    if (index >= 0 && index <= this.length) {
      const node = new Node(element)
      let currentNode = this.head
      let previousNode = null
      let currentIndex = 0

      if (index === 0) {
        if (!head) {
          this.head = node
          this.tail = node
        } else {
          // <node | index=0> -> <head | index=1>
          node.next = currentNode
          this.head = node
          currentNode.prev = node
        }

      } else if (index === this.length) {
        // <tail | index=length - 1> -> <node | index=length>
        currentNode = this.tail
        currentNode.next = node
        node.prev = currentNode
        this.tail = node

      } else {
        while (currentIndex < index) {
          currentIndex++
          previousNode = currentNode
          currentNode = currentNode.next
        }

        // <prev> -> <node> -> <current>
        node.next = currentNode
        previousNode.next = node
        currentNode.prev = node
        node.prev = previousNode
      }
    }
  }
}

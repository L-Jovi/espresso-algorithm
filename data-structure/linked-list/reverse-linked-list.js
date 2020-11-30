/*
 * @Description: reverse linked list
 * @FileName: reverse-linked-list.js
 * @Implements: [size] [head] [add] [remove] [indexOf] [elementAt] [addAt] [removeAt]
 */

function Node(element) {
  this.element = element
  this.next = null
}

function reverseList(head) {
  let prev = null
  let next = null

  while (head) {
    next = head.next
    head.next = prev
    prev = head
    head = next
  }

  return prev
}

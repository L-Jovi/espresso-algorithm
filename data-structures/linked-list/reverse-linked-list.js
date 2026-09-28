/**
 * Reverse a singly linked list in place.
 *
 * Walk the list once and turn every `next` pointer around. Three pointers are
 * enough: `prev` (the already reversed part), `head` (the current node) and
 * `next` (the rest, saved before the pointer is overwritten).
 *
 * Time: O(n). Space: O(1). Works on any nodes with a `next` field.
 */
import { LinkedList } from './linked-list.js'

/**
 * @template {{ next: any }} T
 * @param {T | null} head
 * @returns {T | null} the new head (the old tail)
 */
export function reverseList(head) {
  let prev = null
  while (head) {
    const next = head.next
    head.next = prev
    prev = head
    head = next
  }
  return prev
}

if (import.meta.main) {
  const list = new LinkedList()
  for (const n of [1, 2, 3, 4]) list.add(n)
  const values = []
  for (let node = reverseList(list.head()); node; node = node.next) values.push(node.element)
  console.log('reversed:', values.join(' → '))
}

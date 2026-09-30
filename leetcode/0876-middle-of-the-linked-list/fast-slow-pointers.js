/**
 * LeetCode 876. Middle of the Linked List — https://leetcode.com/problems/middle-of-the-linked-list/
 * Return the middle node of a linked list; with an even number of nodes,
 * the second of the two middle ones.
 *
 * Fast and slow pointers: move `slow` one node and `fast` two nodes at a
 * time. When `fast` cannot take two more steps, `slow` has gone half as
 * far, so it is on the middle node, and for an even length on the second
 * middle one, without the length ever being counted.
 *
 * Time: O(n). Space: O(1).
 */

import { arrayToList, listToArray } from '../../shared/linked-list.js'

export function middleNode(head) {
  let slow = head
  let fast = head
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

if (import.meta.main) console.log(listToArray(middleNode(arrayToList([1, 2, 3, 4, 5, 6]))))

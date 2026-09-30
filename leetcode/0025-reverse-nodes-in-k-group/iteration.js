/**
 * LeetCode 25. Reverse Nodes in k-Group — https://leetcode.com/problems/reverse-nodes-in-k-group/
 * Reverse a linked list k nodes at a time; a last group with fewer than k
 * nodes keeps its order.
 *
 * Iteration with a dummy head: `before` is the node in front of the next
 * group. Walk k nodes ahead to find the group's last node; if the list ends
 * first, stop. Otherwise cut the group out, reverse it, and link it back in
 * between `before` and the rest. The group's old first node is now its last
 * one, and so the `before` of the next group.
 *
 * Time: O(n). Space: O(1).
 */

import { arrayToList, listNode, listToArray } from '../../shared/linked-list.js'

export function reverseKGroup(head, k) {
  const dummy = listNode(0, head)
  let before = dummy
  for (;;) {
    let last = before
    for (let i = 0; i < k && last !== null; i++) last = last.next
    if (last === null) break // fewer than k nodes left
    const first = before.next
    const after = last.next
    last.next = null
    before.next = reverse(first)
    first.next = after
    before = first
  }
  return dummy.next
}

function reverse(head) {
  let previous = null
  let current = head
  while (current !== null) {
    const next = current.next
    current.next = previous
    previous = current
    current = next
  }
  return previous
}

if (import.meta.main) console.log(listToArray(reverseKGroup(arrayToList([1, 2, 3, 4, 5]), 2)))

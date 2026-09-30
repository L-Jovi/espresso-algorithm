/**
 * LeetCode 25. Reverse Nodes in k-Group — https://leetcode.com/problems/reverse-nodes-in-k-group/
 * Reverse a linked list k nodes at a time; a last group with fewer than k
 * nodes keeps its order.
 *
 * Recursion: check that the list has at least k nodes; if not, leave it as
 * it is. Otherwise reverse the first k nodes, and hang the recursively
 * reversed rest of the list after them: the old head is now the last node
 * of its group.
 *
 * Time: O(n). Space: O(n / k) for the recursion, one call per group.
 * Learning source: https://labuladong.online/zh/algo/data-structure/reverse-linked-list-recursion/
 */

import { arrayToList, listToArray } from '../../shared/linked-list.js'

export function reverseKGroup(head, k) {
  let end = head
  for (let i = 0; i < k; i++) {
    if (end === null) return head // fewer than k nodes left
    end = end.next
  }
  const newHead = reverse(head, end)
  head.next = reverseKGroup(end, k)
  return newHead
}

/** Reverse the nodes from `head` up to, but not including, `stop`. */
function reverse(head, stop) {
  let previous = null
  let current = head
  while (current !== stop) {
    const next = current.next
    current.next = previous
    previous = current
    current = next
  }
  return previous
}

if (import.meta.main) console.log(listToArray(reverseKGroup(arrayToList([1, 2, 3, 4, 5]), 2)))

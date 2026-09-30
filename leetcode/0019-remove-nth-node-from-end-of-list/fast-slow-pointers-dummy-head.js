/**
 * LeetCode 19. Remove Nth Node From End of List —
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 * Remove the n-th node from the end of a linked list, in a single pass.
 *
 * The same two pointers as fast-slow-pointers.js, starting from a dummy
 * head: a placeholder node in front of the list. `fast` gets a head start of
 * n + 1 nodes, and both pointers move until `fast` runs off the end; `slow`
 * is then right before the node to remove. Now even the head has a node
 * before it, the dummy, so removing the head is no longer a special case.
 *
 * Time: O(L) for a list of L nodes. Space: O(1).
 */

import { arrayToList, listNode, listToArray } from '../../shared/linked-list.js'

export function removeNthFromEnd(head, n) {
  const dummy = listNode(0, head)
  let fast = dummy
  let slow = dummy
  for (let i = 0; i <= n; i++) fast = fast.next
  while (fast !== null) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return dummy.next
}

if (import.meta.main) console.log(listToArray(removeNthFromEnd(arrayToList([1, 2, 3, 4, 5]), 2)))

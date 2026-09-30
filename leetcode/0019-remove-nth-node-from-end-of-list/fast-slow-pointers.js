/**
 * LeetCode 19. Remove Nth Node From End of List —
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 * Remove the n-th node from the end of a linked list, in a single pass.
 *
 * Two pointers n nodes apart: give `fast` a head start of n nodes, then move
 * both pointers until `fast` is on the last node. `slow` is then right before
 * the node to remove. If `fast` runs off the list during its head start, the
 * node to remove is the head itself, which has no node before it, so it
 * needs a special case; fast-slow-pointers-dummy-head.js avoids that.
 *
 * Time: O(L) for a list of L nodes. Space: O(1).
 * Learning source: https://leetcode.cn/problems/remove-nth-node-from-end-of-list/solutions/16921/yi-tang-sao-miao-shi-yong-shu-zu-bao-cun-lian-biao/
 */

import { arrayToList, listToArray } from '../../shared/linked-list.js'

export function removeNthFromEnd(head, n) {
  let fast = head
  for (let i = 0; i < n; i++) fast = fast.next
  if (fast === null) return head.next // the head is the n-th node from the end
  let slow = head
  while (fast.next !== null) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return head
}

if (import.meta.main) console.log(listToArray(removeNthFromEnd(arrayToList([1, 2, 3, 4, 5]), 2)))

/**
 * LeetCode 24. Swap Nodes in Pairs — https://leetcode.com/problems/swap-nodes-in-pairs/
 * Swap every two neighboring nodes of a linked list by relinking the nodes,
 * without changing the values inside them.
 *
 * Recursion: swap the first two nodes, and let the recursion swap the rest
 * of the list, which starts at the third node. A list with fewer than two
 * nodes stays as it is, which ends the recursion.
 *
 * Time: O(n). Space: O(n) for the recursion, one call per pair.
 */

import { arrayToList, listToArray } from '../../shared/linked-list.js'

export function swapPairs(head) {
  if (head === null || head.next === null) return head
  const second = head.next
  head.next = swapPairs(second.next)
  second.next = head
  return second
}

if (import.meta.main) console.log(listToArray(swapPairs(arrayToList([1, 2, 3, 4]))))

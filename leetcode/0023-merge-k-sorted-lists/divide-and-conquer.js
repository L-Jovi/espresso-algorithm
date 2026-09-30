/**
 * LeetCode 23. Merge k Sorted Lists — https://leetcode.com/problems/merge-k-sorted-lists/
 * Merge k sorted linked lists into one sorted list.
 *
 * Divide and conquer: merge the lists in pairs, then merge the results in
 * pairs, and so on, like the rounds of a knockout tournament. Each round
 * visits every node once, and after log₂ k rounds one list is left.
 * Merging the lists one after another into a growing result would instead
 * revisit the early nodes in every step, O(N · k) in total.
 *
 * Two lists are merged with a loop and a dummy head, not with the recursion
 * of LeetCode 21: here the lists hold up to 10⁴ nodes in total, which is
 * about where that recursion overflows the call stack. A min-heap of the k
 * current heads is the other classic O(N log k) solution; see
 * data-structures/queue/binary-heap-priority-queue.js.
 *
 * Time: O(N log k) for N nodes in k lists. Space: O(k) for the lists of each
 * round; the nodes themselves are reused.
 */

import { arrayToList, listNode, listToArray } from '../../shared/linked-list.js'

export function mergeKLists(lists) {
  if (lists.length === 0) return null
  let round = lists
  while (round.length > 1) {
    const winners = []
    for (let i = 0; i < round.length; i += 2) {
      winners.push(i + 1 < round.length ? mergeTwoLists(round[i], round[i + 1]) : round[i])
    }
    round = winners
  }
  return round[0]
}

function mergeTwoLists(a, b) {
  const dummy = listNode(0)
  let tail = dummy
  while (a !== null && b !== null) {
    if (a.val <= b.val) {
      tail.next = a
      a = a.next
    } else {
      tail.next = b
      b = b.next
    }
    tail = tail.next
  }
  tail.next = a ?? b
  return dummy.next
}

if (import.meta.main) console.log(listToArray(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]].map(arrayToList))))

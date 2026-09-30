/**
 * LeetCode 21. Merge Two Sorted Lists — https://leetcode.com/problems/merge-two-sorted-lists/
 * Merge two sorted linked lists into one sorted list, reusing their nodes.
 *
 * Recursion: the smaller of the two heads comes first, followed by the merge
 * of everything that is left. An empty list merges into the other one
 * unchanged, which ends the recursion.
 *
 * Time: O(m + n). Space: O(m + n) for the recursion, one call per node.
 * That is fine for LeetCode's lists of up to 50 nodes, but on Node 24 two
 * lists of 10,000 nodes in total already overflow the call stack; a loop
 * with a dummy head does the same merge in O(1) space.
 */

import { arrayToList, listToArray } from '../../shared/linked-list.js'

export function mergeTwoLists(list1, list2) {
  if (list1 === null) return list2
  if (list2 === null) return list1
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  }
  list2.next = mergeTwoLists(list1, list2.next)
  return list2
}

if (import.meta.main) console.log(listToArray(mergeTwoLists(arrayToList([1, 2, 4]), arrayToList([1, 3, 4]))))

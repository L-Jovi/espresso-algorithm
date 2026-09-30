/**
 * LeetCode 23. Merge k Sorted Lists — https://leetcode.com/problems/merge-k-sorted-lists/
 * Merge k sorted linked lists into one sorted list.
 *
 * Brute force: ignore that the lists are sorted. Collect every value into an
 * array, sort it, and build a new list from the result.
 *
 * Time: O(N log N) for N nodes in total. Space: O(N) for the array and the
 * new nodes. divide-and-conquer.js uses the order that is already there.
 */

import { arrayToList, listNode, listToArray } from '../../shared/linked-list.js'

export function mergeKLists(lists) {
  const values = []
  for (let node of lists) {
    for (; node !== null; node = node.next) values.push(node.val)
  }
  values.sort((a, b) => a - b)
  const dummy = listNode(0)
  let tail = dummy
  for (const value of values) {
    tail.next = listNode(value)
    tail = tail.next
  }
  return dummy.next
}

if (import.meta.main) console.log(listToArray(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]].map(arrayToList))))

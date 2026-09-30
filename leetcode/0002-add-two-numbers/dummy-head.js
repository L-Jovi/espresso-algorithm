/**
 * LeetCode 2. Add Two Numbers — https://leetcode.com/problems/add-two-numbers/
 * Two numbers are stored as linked lists of digits, least significant digit
 * first. Return their sum as a list in the same form.
 *
 * The same digit-by-digit addition as digit-by-digit.js, built with a dummy
 * head: a placeholder node in front of the result. Every digit is appended the
 * same way, including the first, so there is no special case for an empty
 * result; the answer is dummy.next.
 *
 * Time: O(max(m, n)). Space: O(max(m, n)) for the result.
 */
import { arrayToList, listNode, listToArray } from '../../shared/linked-list.js'

export function addTwoNumbers(l1, l2) {
  const dummy = listNode(0)
  let tail = dummy
  let carry = 0
  while (l1 || l2 || carry) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry
    carry = Math.floor(sum / 10)
    tail = tail.next = listNode(sum % 10)
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  return dummy.next
}

if (import.meta.main) {
  console.log('342 + 465 =', listToArray(addTwoNumbers(arrayToList([2, 4, 3]), arrayToList([5, 6, 4]))).reverse().join(''))
}

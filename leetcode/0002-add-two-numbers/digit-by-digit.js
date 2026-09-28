/**
 * LeetCode 2. Add Two Numbers — https://leetcode.com/problems/add-two-numbers/
 * Two numbers are stored as linked lists of digits, least significant digit
 * first. Return their sum as a list in the same form.
 *
 * Digit by digit, as on paper: add the two digits and the carry, keep
 * sum % 10 and carry the rest. Because the lists start with the ones digit,
 * walking them from the head is already the right order. This version writes
 * into the current node and creates the next one only when more digits follow.
 *
 * Time: O(max(m, n)). Space: O(max(m, n)) for the result.
 */
import { arrayToList, listNode, listToArray } from '../../shared/linked-list.js'

export function addTwoNumbers(l1, l2) {
  const head = listNode(0)
  let current = head
  let carry = 0
  while (l1 || l2) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry
    carry = sum >= 10 ? 1 : 0
    current.val = sum % 10
    l1 = l1 && l1.next
    l2 = l2 && l2.next
    if (l1 || l2) current = current.next = listNode(0)
  }
  if (carry > 0) current.next = listNode(carry)
  return head
}

if (import.meta.main) {
  console.log('342 + 465 =', listToArray(addTwoNumbers(arrayToList([2, 4, 3]), arrayToList([5, 6, 4]))).reverse().join(''))
}

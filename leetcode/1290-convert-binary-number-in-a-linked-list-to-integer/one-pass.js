/**
 * LeetCode 1290. Convert Binary Number in a Linked List to Integer —
 * https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
 * The nodes of a linked list hold the bits of a binary number, the most
 * significant bit first. Return the number.
 *
 * One pass: reading a binary number from the left, each new bit doubles the
 * value read so far and adds itself, value = 2 · value + bit, just as each
 * new decimal digit multiplies the value by 10. No length and no array are
 * needed. (value << 1) | bit does the same with bit operators, for up to 31
 * bits in JavaScript; LeetCode's lists have at most 30.
 *
 * Time: O(n). Space: O(1).
 */

import { arrayToList } from '../../shared/linked-list.js'

export function getDecimalValue(head) {
  let value = 0
  for (let node = head; node !== null; node = node.next) value = 2 * value + node.val
  return value
}

if (import.meta.main) console.log(getDecimalValue(arrayToList([1, 0, 1])))

/**
 * LeetCode 1290. Convert Binary Number in a Linked List to Integer —
 * https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
 * The nodes of a linked list hold the bits of a binary number, the most
 * significant bit first. Return the number.
 *
 * Powers of two: read the bits into an array, which tells how many there
 * are. The bit at position i from the end is worth 2^i, so add up
 * bit · 2^i. It takes two passes and an array; one-pass.js needs neither.
 *
 * Time: O(n). Space: O(n) for the bits.
 */

import { arrayToList } from '../../shared/linked-list.js'

export function getDecimalValue(head) {
  const bits = []
  for (let node = head; node !== null; node = node.next) bits.push(node.val)
  let value = 0
  bits.forEach((bit, i) => {
    value += bit * 2 ** (bits.length - 1 - i)
  })
  return value
}

if (import.meta.main) console.log(getDecimalValue(arrayToList([1, 0, 1])))

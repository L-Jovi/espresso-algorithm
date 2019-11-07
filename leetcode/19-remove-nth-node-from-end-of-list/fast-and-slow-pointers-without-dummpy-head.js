/**
 *
 * Definition for singly-linked list.
 */
 function ListNode(val) {
     this.val = val;
     this.next = null;
 }


/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 * [https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/yi-tang-sao-miao-shi-yong-shu-zu-bao-cun-lian-biao/]
 */
const removeNthFromEnd = function(head, n) {
  p1 = head  // fast pointer
  p2 = head  // slow pointer

  for (let i = 0; i < n; i++) {
    p1 = p1.next
  }

  if (!p1) {
    return head.next
  }

  while (p1.next) {
    p1 = p1.next
    p2 = p2.next
  }

  p2.next = p2.next.next

  return head
}


const head = new ListNode(1)
console.log(removeNthFromEnd(head, 1))

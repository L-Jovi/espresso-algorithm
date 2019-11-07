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
 */
const removeNthFromEnd = function(head, n) {
  const dummyHead = new ListNode(0)
  dummyHead.next = head

  p1 = dummyHead  // fast pointer
  p2 = dummyHead  // slow pointer

  for (let i = 0; i < n + 1; i++) {
    p1 = p1.next
  }

  while (p1) {
    p1 = p1.next
    p2 = p2.next
  }

  p2.next = p2.next.next

  return dummyHead.next
}


const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)

removeNthFromEnd(head, 2)

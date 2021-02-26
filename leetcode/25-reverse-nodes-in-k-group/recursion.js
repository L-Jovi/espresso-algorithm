/**
 * Definition for singly-linked list.
 */
 function ListNode(val) {
   this.val = val
   this.next = null
 }


/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * https://labuladong.github.io/algo/%E9%AB%98%E9%A2%91%E9%9D%A2%E8%AF%95%E7%B3%BB%E5%88%97/k%E4%B8%AA%E4%B8%80%E7%BB%84%E5%8F%8D%E8%BD%AC%E9%93%BE%E8%A1%A8.html
 */
const reverseKGroup = (head, k) => {
  if (!head) {
    return null
  }

  let start = end = head

  for (let i = 0; i < k; i++) {
    if (!end) {
      return head
    }
    end = end.next
  }

  const reversedHead = reverse(start, end)
  start.next = reverseKGroup(end, k)
  return reversedHead
}

const reverse = (head, tail) => {
  let pre = null
  let current = head

  while (current !== tail) {
    const next = current.next
    current.next = pre
    pre = current
    current = next
  }

  return pre
}

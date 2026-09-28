/**
 * Priority queue on a binary min-heap.
 *
 * A binary heap is a complete binary tree stored in an array: the children of
 * index i are at 2i + 1 and 2i + 2, and every parent comes before its
 * children. The front item is therefore always at index 0.
 *
 * - enqueue: put the item at the end, then swap it with its parent while it
 *   should come before the parent ("sift up").
 * - dequeue: take index 0, move the last item there, then swap it with its
 *   earlier child while a child should come first ("sift down").
 *
 * Both walk one path of a tree of height log n. A counter breaks ties, so
 * items with equal priority leave in the order they came, exactly like
 * priority-queue.js. This is how the priority queues in Python (heapq) and
 * Java (PriorityQueue) work; JavaScript has no built-in one.
 *
 * enqueue, dequeue: O(log n). front, size, isEmpty: O(1).
 */

export class BinaryHeapPriorityQueue {
  #heap = [] // { value, priority, order }
  #nextOrder = 0

  enqueue(value, priority) {
    this.#heap.push({ value, priority, order: this.#nextOrder++ })
    let i = this.#heap.length - 1
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (!this.#before(this.#heap[i], this.#heap[parent])) break
      this.#swap(i, parent)
      i = parent
    }
  }

  dequeue() {
    if (this.#heap.length === 0) return undefined
    const top = this.#heap[0]
    const last = this.#heap.pop()
    if (this.#heap.length > 0) {
      this.#heap[0] = last
      let i = 0
      for (;;) {
        const left = 2 * i + 1
        const right = left + 1
        let first = i
        if (left < this.#heap.length && this.#before(this.#heap[left], this.#heap[first])) first = left
        if (right < this.#heap.length && this.#before(this.#heap[right], this.#heap[first])) first = right
        if (first === i) break
        this.#swap(i, first)
        i = first
      }
    }
    return top.value
  }

  front() {
    return this.#heap[0]?.value
  }

  isEmpty() {
    return this.#heap.length === 0
  }

  size() {
    return this.#heap.length
  }

  #before(a, b) {
    return a.priority < b.priority || (a.priority === b.priority && a.order < b.order)
  }

  #swap(i, j) {
    const tmp = this.#heap[i]
    this.#heap[i] = this.#heap[j]
    this.#heap[j] = tmp
  }
}

if (import.meta.main) {
  const queue = new BinaryHeapPriorityQueue()
  queue.enqueue('gannicus', 3)
  queue.enqueue('spartacus', 1)
  queue.enqueue('crixus', 2)
  queue.enqueue('oenomaus', 4)
  console.log(Array.from({ length: 4 }, () => queue.dequeue()).join(' → '))
}

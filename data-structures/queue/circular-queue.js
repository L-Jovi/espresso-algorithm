/**
 * Circular queue: a queue in a fixed array whose ends wrap around.
 *
 * Instead of moving items when one leaves, keep two indexes, `head` (the
 * front item) and `tail` (where the next item goes), and let both wrap to the
 * start of the array with `% length`. One slot always stays empty, so that
 * "full" (tail is just behind head) and "empty" (tail equals head) look
 * different.
 *
 * When the array is full it doubles; when only a quarter is used it halves.
 * Resizing costs O(n), but it happens rarely enough that each operation is
 * O(1) on average ("amortized").
 *
 * enqueue, dequeue: O(1) amortized. front, size, isEmpty: O(1).
 * Learning source: https://blog.csdn.net/fansongy/article/details/6784954
 */

export class CircularQueue {
  #slots
  #head = 0
  #tail = 0
  #size = 0

  constructor(capacity = 4) {
    this.#slots = new Array(capacity + 1)
  }

  enqueue(item) {
    if ((this.#tail + 1) % this.#slots.length === this.#head) {
      this.#resize(this.capacity() * 2)
    }
    this.#slots[this.#tail] = item
    this.#tail = (this.#tail + 1) % this.#slots.length
    this.#size++
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('The queue is empty.')
    const item = this.#slots[this.#head]
    this.#slots[this.#head] = undefined
    this.#head = (this.#head + 1) % this.#slots.length
    this.#size--
    if (this.#size > 0 && this.#size === Math.floor(this.capacity() / 4)) {
      this.#resize(Math.floor(this.capacity() / 2))
    }
    return item
  }

  front() {
    if (this.isEmpty()) throw new Error('The queue is empty.')
    return this.#slots[this.#head]
  }

  size() {
    return this.#size
  }

  isEmpty() {
    return this.#size === 0
  }

  /** How many items fit before the next resize. */
  capacity() {
    return this.#slots.length - 1
  }

  #resize(capacity) {
    const slots = new Array(capacity + 1)
    for (let i = 0; i < this.#size; i++) {
      slots[i] = this.#slots[(this.#head + i) % this.#slots.length]
    }
    this.#slots = slots
    this.#head = 0
    this.#tail = this.#size
  }
}

if (import.meta.main) {
  const queue = new CircularQueue(2)
  for (const n of [1, 2, 3, 4, 5]) queue.enqueue(n)
  console.log('capacity after 5 items:', queue.capacity())
  console.log('dequeue order:', [1, 2, 3, 4, 5].map(() => queue.dequeue()).join(' '))
}

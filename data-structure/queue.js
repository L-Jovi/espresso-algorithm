//
// queue.js
//
// implements [enqueue] [dequeue] [front] [isEmpty] [size]
//

function Queue() {
  const collection = []

  this.print = function() {
    console.log(collection)
  }

  this.enqueue = function(element) {
    collection.push(element)
  }

  this.dequeue = function () {
    return collection.shift();
  }

  this.front = function () {
    return collection[0];
  }

  this.isEmpty = function () {
    return collection.length === 0;
  }

  this.size = function () {
    return collection.length;
  }
}


//
// sq queue
//
// refer [https://blog.csdn.net/fansongy/article/details/6784954]
//

class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    this.first = 0  // head
    this.last = 0 // tail
    this.size = 0
  }

  enQueue(item) {
    // test last whether it is looped
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }

    this.queue[this.last] = item
    this.size++
    this.last = this.last + 1
  }

  deQueue() {
    if (this.isEmpty()) {
      throw Error('Queue is Empty.')

    } else {
      // dequeue at first node
      let r = this.queue[this.first]
      this.queue[this.first] = null
      this.first = this.first + 1
      this.size--

      if (this.size === this.getLength / 4 && this.getLength() / 2 !== 0) {
        this.resize(this.getLength() / 2)
      }

      return r
    }
  }

  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is Empty.')

    } else {
      return this.queue[this.first]
    }
  }

  getLength() {
    return this.queue.length - 1
  }

  resize(length) {
    let q = new Array(length)

    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length]
    }

    this.queue = q
    this.first = 0
    this.last = this.size
  }

  isEmpty() {
    return this.first === this.last
  }
}

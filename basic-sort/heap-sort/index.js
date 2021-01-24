/*
 * @Description: Heap sort implements by Javascript.
 * @FileName: heap-sort/index.js
 * @Refer: [https://www.cnblogs.com/chengxiao/p/6129630.html]
 */

const heapSort = (array) => {
  // 1)
  // build big top heap => asc sort
  // adjust the structure from the first non-leaf node from bottom to top and from right to left
  for (i = parseInt(array.length / 2) - 1; i > 0; i--) {
    adjustHeap(array, array.length, i)
  }

  // 2)
  // adjust heap structure
  // swap top and end elements
  for (let j = array.length - 1; j > 0; j--) {
    swap(array, 0, j)   // exchange the top and bottom elements
    adjustHeap(array, j, 0)  // re-adjust the heap
  }
}


/**
 * Adjust big top head
 *
 * @param {Array} array
 * @param {Number} length
 * @param {Number} i
 */
const adjustHeap = (array, length, i) => {
  const tmp = array[i]

  // starting from the left child node of the i-node, that is, starting at 2i+1
  for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
    if (k + 1 < length && array[k] < array[k + 1]) {
      k++
    }

    // if the child node is larger than the parent node, assign the child node value to the parent node
    if (array[k] > tmp) {
      array[i] = array[k]
      i = k

    } else {
      break
    }
  }

  array[i] = tmp
}


/**
 * swap element
 * @param {Array} array
 * @param {Number} a
 * @param {Number} b
 */
const swap = (array, a, b) => {
  const tmp = array[a]
  array[a] = array[b]
  array[b] = tmp
}



// test
const array = [9, 8, 7, 6, 5, 4, 3, 2, 1]
heapSort(array)
console.log(array)

// Race every sort on the same random numbers: `npm run bench`.
//
// Each cell is the fastest of three runs on a fresh copy of the same input,
// which smooths out just-in-time compilation and garbage collection. The
// quadratic sorts stop at 10,000 items: at 100,000 each would take minutes.
// Timings depend on the machine; compare rows, not absolute numbers.
import { measure } from '../shared/measure.js'
import { randomIntegers } from '../shared/random.js'
import { shakerSort as shakerSortFixed } from './bidirectional-bubble-sort/fixed-bounds.js'
import { shakerSort as shakerSortShrinking } from './bidirectional-bubble-sort/shrinking-bounds.js'
import { bubbleSort } from './bubble-sort/bubble-sort.js'
import { heapSort } from './heap-sort/heap-sort.js'
import { insertionSort } from './insertion-sort/insertion-sort.js'
import { mergeSort as mergeSortBottomUp } from './merge-sort/bottom-up.js'
import { mergeSort as mergeSortCopying } from './merge-sort/top-down-copying.js'
import { mergeSort as mergeSortIndices } from './merge-sort/top-down-indices.js'
import { quickSort as quickSortThreeWay } from './quick-sort/three-way-in-place.js'
import { quickSort as quickSortTwoWay } from './quick-sort/two-way-copying.js'
import { radixSort } from './radix-sort/radix-sort.js'
import { exchangeSort } from './selection-sort/exchange-sort.js'
import { selectionSort } from './selection-sort/selection-sort.js'
import { shellSort } from './shell-sort/shell-sort.js'

const ascending = (a, b) => a - b
const sizes = [1_000, 10_000, 100_000]
const QUADRATIC_LIMIT = 10_000

const contenders = [
  ['bubble sort', bubbleSort, true],
  ['shaker sort, fixed bounds', shakerSortFixed, true],
  ['shaker sort, shrinking bounds', shakerSortShrinking, true],
  ['exchange sort', exchangeSort, true],
  ['selection sort', selectionSort, true],
  ['insertion sort', insertionSort, true],
  ['shell sort', shellSort, false],
  ['merge sort, top down, copying', mergeSortCopying, false],
  ['merge sort, top down, indices', mergeSortIndices, false],
  ['merge sort, bottom up', mergeSortBottomUp, false],
  ['quick sort, two-way, copying', quickSortTwoWay, false],
  ['quick sort, three-way, in place', quickSortThreeWay, false],
  ['heap sort', heapSort, false],
  ['radix sort', radixSort, false],
  ['built-in Array.prototype.sort', array => array.sort(ascending), false],
]

const inputs = sizes.map(size => randomIntegers(size, { min: -1_000_000, max: 1_000_000, seed: size }))

const bestOfThree = (sort, input) =>
  Math.min(...[1, 2, 3].map(() => measure(sort, [...input]).ms))

const formatMs = ms => (ms < 10 ? ms.toFixed(2) : ms.toFixed(0)).padStart(8)
const header = ['algorithm'.padEnd(34), ...sizes.map(size => size.toLocaleString('en').padStart(8))].join('  ')

console.log(`Milliseconds to sort random integers (best of 3), Node ${process.version}\n`)
console.log(header)
console.log('-'.repeat(header.length))
for (const [name, sort, quadratic] of contenders) {
  const cells = inputs.map(input =>
    quadratic && input.length > QUADRATIC_LIMIT ? '       –' : formatMs(bestOfThree(sort, input)))
  console.log([name.padEnd(34), ...cells].join('  '))
}

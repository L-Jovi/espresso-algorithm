// Race the approaches of every problem here that has several on one input:
// `npm run bench:leetcode`.
//
// All approaches of a problem get the same seeded input, sized so that the
// slowest still finishes in about a second; a dash marks an approach left
// out of a larger input because it would take minutes or overflow the
// stack. Each time is the fastest of three runs on a freshly built input,
// which smooths out just-in-time compilation and garbage collection.
// Timings depend on the machine: compare the rows of one problem, not the
// numbers themselves.
import { treeNode } from '../data-structures/tree/binary-tree-array.js'
import { arrayToList } from '../shared/linked-list.js'
import { measure } from '../shared/measure.js'
import { createRandom, randomIntegers } from '../shared/random.js'
import { twoSum as twoSumBruteForce } from './0001-two-sum/brute-force.js'
import { twoSum as twoSumHashMap } from './0001-two-sum/hash-map.js'
import { findMedianSortedArrays as medianBinarySearch } from './0004-median-of-two-sorted-arrays/binary-search.js'
import { findMedianSortedArrays as medianMerge } from './0004-median-of-two-sorted-arrays/merge.js'
import { longestPalindrome as palindromeExpand } from './0005-longest-palindromic-substring/expand-around-center.js'
import { longestPalindrome as palindromeTable } from './0005-longest-palindromic-substring/tabulation.js'
import { mergeKLists as mergeBruteForce } from './0023-merge-k-sorted-lists/brute-force.js'
import { mergeKLists as mergeDivideAndConquer } from './0023-merge-k-sorted-lists/divide-and-conquer.js'
import { removeDuplicates as dedupeSplice } from './0026-remove-duplicates-from-sorted-array/splice.js'
import { removeDuplicates as dedupeTwoPointers } from './0026-remove-duplicates-from-sorted-array/two-pointers.js'
import { strStr as searchBruteForce } from './0028-find-the-index-of-the-first-occurrence-in-a-string/brute-force.js'
import { strStr as searchKmp } from './0028-find-the-index-of-the-first-occurrence-in-a-string/kmp.js'
import { maxSubArray as subarrayBruteForce } from './0053-maximum-subarray/brute-force.js'
import { maxSubArray as subarraySpaceOptimized } from './0053-maximum-subarray/space-optimized.js'
import { maxSubArray as subarrayTabulation } from './0053-maximum-subarray/tabulation.js'
import { connect as connectIteration } from './0116-populating-next-right-pointers-in-each-node/iteration.js'
import { connect as connectPreOrder } from './0116-populating-next-right-pointers-in-each-node/pre-order.js'
import { maxProfit as stockBruteForce } from './0121-best-time-to-buy-and-sell-stock/brute-force.js'
import { maxProfit as stockSpaceOptimized } from './0121-best-time-to-buy-and-sell-stock/space-optimized.js'
import { maxProfit as stockTabulation } from './0121-best-time-to-buy-and-sell-stock/tabulation.js'
import { minCost as paintBruteForce } from './0256-paint-house/brute-force.js'
import { minCost as paintMemoization } from './0256-paint-house/memoization.js'
import { minCost as paintTabulation } from './0256-paint-house/tabulation.js'
import { coinChange as coinsBruteForce } from './0322-coin-change/brute-force.js'
import { coinChange as coinsMemoization } from './0322-coin-change/memoization.js'
import { coinChange as coinsTabulation } from './0322-coin-change/tabulation.js'
import { fib as fibFastDoubling } from './0509-fibonacci-number/fast-doubling.js'
import { fib as fibMemoization } from './0509-fibonacci-number/memoization.js'
import { fib as fibRecursion } from './0509-fibonacci-number/recursion.js'
import { fib as fibSpaceOptimized } from './0509-fibonacci-number/space-optimized.js'
import { fib as fibTabulation } from './0509-fibonacci-number/tabulation.js'
import { openLock as lockBfs } from './0752-open-the-lock/bfs.js'
import { openLock as lockBidirectional } from './0752-open-the-lock/bidirectional-bfs.js'
import { longestCommonSubsequence as lcsBruteForce } from './1143-longest-common-subsequence/brute-force.js'
import { longestCommonSubsequence as lcsMemoization } from './1143-longest-common-subsequence/memoization.js'
import { longestCommonSubsequence as lcsTabulation } from './1143-longest-common-subsequence/tabulation.js'
import { balancedStringSplit as splitCounter } from './1221-split-a-string-in-balanced-strings/balance-counter.js'
import { balancedStringSplit as splitRegex } from './1221-split-a-string-in-balanced-strings/regex-window.js'

const text = (length, letters, seed) => {
  const next = createRandom(seed)
  return Array.from({ length }, () => letters[Math.floor(next() * letters.length)]).join('')
}
const sorted = (length, seed) => randomIntegers(length, { min: -1e6, max: 1e6, seed }).toSorted((a, b) => a - b)
const perfectTree = depth => (depth === 0 ? null : { ...treeNode(0, perfectTree(depth - 1), perfectTree(depth - 1)), next: null })

// Each input builds fresh arguments for every run; `slow` lists the
// approaches that sit out that input.
const races = [
  {
    title: '1. Two Sum',
    approaches: { 'brute force': twoSumBruteForce, 'hash map': twoSumHashMap },
    inputs: [{ label: '10,000 numbers', build: () => [[...randomIntegers(9_998, { min: 0, max: 1e6, seed: 1 }), -1, -2], -3] }],
  },
  {
    title: '4. Median of Two Sorted Arrays',
    approaches: { merge: medianMerge, 'binary search': medianBinarySearch },
    inputs: [{ label: '2 × 1,000,000 numbers', build: () => [sorted(1e6, 41), sorted(1e6, 42)] }],
  },
  {
    title: '5. Longest Palindromic Substring',
    approaches: { tabulation: palindromeTable, 'expand around center': palindromeExpand },
    inputs: [{ label: '2,000 letters', build: () => [text(2_000, 'ab', 5)] }],
  },
  {
    title: '23. Merge k Sorted Lists',
    approaches: { 'brute force': mergeBruteForce, 'divide and conquer': mergeDivideAndConquer },
    inputs: [{ label: '1,000 lists × 100 nodes', build: () => [Array.from({ length: 1_000 }, (_, i) => arrayToList(sorted(100, 230 + i)))] }],
  },
  {
    title: '26. Remove Duplicates from Sorted Array',
    approaches: { splice: dedupeSplice, 'two pointers': dedupeTwoPointers },
    inputs: [{ label: '20,000 equal numbers', build: () => [new Array(20_000).fill(7)] }],
  },
  {
    title: '28. Find the Index of the First Occurrence in a String',
    approaches: { 'brute force': searchBruteForce, kmp: searchKmp },
    inputs: [{ label: '"a…ab" in "a…ab"', build: () => ['a'.repeat(50_000) + 'b', 'a'.repeat(1_000) + 'b'] }],
  },
  {
    title: '53. Maximum Subarray',
    approaches: { 'brute force': subarrayBruteForce, tabulation: subarrayTabulation, 'space-optimized': subarraySpaceOptimized },
    inputs: [
      { label: '10,000 numbers', build: () => [randomIntegers(10_000, { seed: 53 })] },
      { label: '1,000,000 numbers', build: () => [randomIntegers(1e6, { seed: 530 })], slow: ['brute force'] },
    ],
  },
  {
    title: '116. Populating Next Right Pointers in Each Node',
    approaches: { 'pre-order': connectPreOrder, iteration: connectIteration },
    inputs: [{ label: '65,535 nodes', build: () => [perfectTree(16)] }],
  },
  {
    title: '121. Best Time to Buy and Sell Stock',
    approaches: { 'brute force': stockBruteForce, tabulation: stockTabulation, 'space-optimized': stockSpaceOptimized },
    inputs: [
      { label: '20,000 days', build: () => [randomIntegers(20_000, { min: 0, max: 1e4, seed: 121 })] },
      { label: '1,000,000 days', build: () => [randomIntegers(1e6, { min: 0, max: 1e4, seed: 1210 })], slow: ['brute force'] },
    ],
  },
  {
    title: '256. Paint House',
    approaches: { 'brute force': paintBruteForce, memoization: paintMemoization, tabulation: paintTabulation },
    inputs: [
      { label: '20 houses', build: () => [randomIntegers(60, { min: 1, max: 20, seed: 256 }).reduce((rows, cost, i) => (i % 3 ? rows.at(-1).push(cost) : rows.push([cost]), rows), [])] },
      { label: '10,000 houses', build: () => [randomIntegers(30_000, { min: 1, max: 20, seed: 2560 }).reduce((rows, cost, i) => (i % 3 ? rows.at(-1).push(cost) : rows.push([cost]), rows), [])], slow: ['brute force', 'memoization'] },
    ],
  },
  {
    title: '322. Coin Change',
    approaches: { 'brute force': coinsBruteForce, memoization: coinsMemoization, tabulation: coinsTabulation },
    inputs: [
      { label: 'amount 28', build: () => [[1, 2, 5], 28] },
      { label: 'amount 10,000', build: () => [[1, 2, 5], 10_000], slow: ['brute force', 'memoization'] },
    ],
  },
  {
    title: '509. Fibonacci Number',
    approaches: { recursion: fibRecursion, memoization: fibMemoization, tabulation: fibTabulation, 'space-optimized': fibSpaceOptimized, 'fast doubling': fibFastDoubling },
    inputs: [{ label: 'n = 32', build: () => [32] }],
  },
  {
    title: '752. Open the Lock',
    approaches: { bfs: lockBfs, 'bidirectional bfs': lockBidirectional },
    inputs: [{ label: '"8888", 8 dead ends', build: () => [['0001', '0010', '0100', '1000', '9999', '8889', '8898', '8988'], '8888'] }],
  },
  {
    title: '1143. Longest Common Subsequence',
    approaches: { 'brute force': lcsBruteForce, memoization: lcsMemoization, tabulation: lcsTabulation },
    inputs: [
      { label: '2 × 12 letters', build: () => ['abcdefghijkl', 'mnopqrstuvwx'] },
      { label: '2 × 1,000 letters', build: () => [text(1_000, 'abcd', 1143), text(1_000, 'abcd', 11430)], slow: ['brute force'] },
    ],
  },
  {
    title: '1221. Split a String in Balanced Strings',
    approaches: { 'regex window': splitRegex, 'balance counter': splitCounter },
    inputs: [{ label: '20,000 letters, one piece', build: () => ['L'.repeat(10_000) + 'R'.repeat(10_000)] }],
  },
]

const bestOfThree = (solve, build) => Math.min(...[1, 2, 3].map(() => measure(solve, ...build()).ms))
const format = ms => (ms < 0.01 ? '< 0.01' : ms < 10 ? ms.toFixed(2) : ms.toFixed(0))

console.log(`Milliseconds per call, best of 3; Node ${process.version}, ${new Date().toISOString().slice(0, 10)}`)
for (const { title, approaches, inputs } of races) {
  const widths = inputs.map(input => Math.max(input.label.length, 8))
  console.log(`\n${title}`)
  console.log(`  ${''.padEnd(22)}  ${inputs.map((input, i) => input.label.padStart(widths[i])).join('  ')}`)
  for (const [name, solve] of Object.entries(approaches)) {
    const cells = inputs.map((input, i) =>
      (input.slow?.includes(name) ? '–' : format(bestOfThree(solve, input.build))).padStart(widths[i]))
    console.log(`  ${name.padEnd(22)}  ${cells.join('  ')}`)
  }
}

/**
 * The races behind `npm run bench:leetcode` and the race page of the site:
 * for every problem here with several approaches, the approaches and the
 * inputs they are timed on.
 *
 * Each input builds fresh arguments on every call, sized so that the
 * slowest approach still finishes in about a second; `slow` lists the
 * approaches that sit out an input because they would take minutes or
 * overflow the call stack. `check` builds a small example, on which
 * every approach must match `expected`, normalized through `answer`
 * where the result is a list, a tree or one of several right answers.
 * `fresh` marks races whose approaches change their input, so the input
 * cannot be reused between calls. `titleZh`, `labelZh` and
 * APPROACH_NAMES_ZH are the Chinese text of the race page.
 */
import { treeNode } from '../data-structures/tree/binary-tree-array.js'
import { arrayToList, listToArray } from '../shared/linked-list.js'
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
const houses = (count, seed) => randomIntegers(3 * count, { min: 1, max: 20, seed }).reduce((rows, cost, i) => (i % 3 ? rows.at(-1).push(cost) : rows.push([cost]), rows), [])

// LeetCode's output for 116: each level read through the next pointers.
function readByNext(root) {
  const out = []
  for (let leftmost = root; leftmost !== null; leftmost = leftmost.left) {
    for (let node = leftmost; node != null; node = node.next) out.push(node.val)
    out.push('#')
  }
  return out.join(',')
}

// The approaches' names on the race page in Chinese, the way the Chinese
// READMEs call them.
export const APPROACH_NAMES_ZH = {
  'balance counter': '计数法',
  bfs: 'BFS',
  'bidirectional bfs': '双向 BFS',
  'binary search': '二分查找',
  'brute force': '暴力解',
  'divide and conquer': '分治',
  'expand around center': '中心扩展',
  'fast doubling': '快速倍增',
  'hash map': '哈希表',
  iteration: '逐层迭代',
  kmp: 'KMP',
  memoization: '记忆化',
  merge: '归并',
  'pre-order': '前序递归',
  recursion: '递归',
  'regex window': '正则窗口',
  'space-optimized': '空间优化版',
  splice: 'splice',
  tabulation: '表格法',
  'two pointers': '双指针',
}

export const RACES = [
  {
    id: '0001-two-sum',
    title: '1. Two Sum',
    titleZh: '1. 两数之和',
    approaches: { 'brute force': twoSumBruteForce, 'hash map': twoSumHashMap },
    inputs: [{ label: '10,000 numbers', labelZh: '10,000 个数', build: () => [[...randomIntegers(9_998, { min: 0, max: 1e6, seed: 1 }), -1, -2], -3] }],
    check: () => [[2, 7, 11, 15], 9],
    expected: [0, 1],
  },
  {
    id: '0004-median-of-two-sorted-arrays',
    title: '4. Median of Two Sorted Arrays',
    titleZh: '4. 寻找两个正序数组的中位数',
    approaches: { merge: medianMerge, 'binary search': medianBinarySearch },
    inputs: [{ label: '2 × 1,000,000 numbers', labelZh: '2 × 1,000,000 个数', build: () => [sorted(1e6, 41), sorted(1e6, 42)] }],
    check: () => [[1, 3], [2]],
    expected: 2,
  },
  {
    id: '0005-longest-palindromic-substring',
    title: '5. Longest Palindromic Substring',
    titleZh: '5. 最长回文子串',
    approaches: { tabulation: palindromeTable, 'expand around center': palindromeExpand },
    inputs: [{ label: '2,000 letters', labelZh: '2,000 个字母', build: () => [text(2_000, 'ab', 5)] }],
    check: () => ['babad'],
    expected: 3,
    answer: palindrome => palindrome.length, // "bab" and "aba" are both right
  },
  {
    id: '0023-merge-k-sorted-lists',
    title: '23. Merge k Sorted Lists',
    titleZh: '23. 合并 K 个升序链表',
    approaches: { 'brute force': mergeBruteForce, 'divide and conquer': mergeDivideAndConquer },
    inputs: [{ label: '1,000 lists × 100 nodes', labelZh: '1,000 个链表 × 100 个结点', build: () => [Array.from({ length: 1_000 }, (_, i) => arrayToList(sorted(100, 230 + i)))] }],
    check: () => [[[1, 4, 5], [1, 3, 4], [2, 6]].map(arrayToList)],
    expected: [1, 1, 2, 3, 4, 4, 5, 6],
    answer: listToArray,
    fresh: true,
  },
  {
    id: '0026-remove-duplicates-from-sorted-array',
    title: '26. Remove Duplicates from Sorted Array',
    titleZh: '26. 删除有序数组中的重复项',
    approaches: { splice: dedupeSplice, 'two pointers': dedupeTwoPointers },
    inputs: [{ label: '20,000 equal numbers', labelZh: '20,000 个相同的数', build: () => [new Array(20_000).fill(7)] }],
    check: () => [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]],
    expected: 5,
    fresh: true,
  },
  {
    id: '0028-find-the-index-of-the-first-occurrence-in-a-string',
    title: '28. Find the Index of the First Occurrence in a String',
    titleZh: '28. 找出字符串中第一个匹配项的下标',
    approaches: { 'brute force': searchBruteForce, kmp: searchKmp },
    inputs: [{ label: '"a…ab" in "a…ab"', labelZh: '在 "a…ab" 里找 "a…ab"', build: () => ['a'.repeat(50_000) + 'b', 'a'.repeat(1_000) + 'b'] }],
    check: () => ['sadbutsad', 'sad'],
    expected: 0,
  },
  {
    id: '0053-maximum-subarray',
    title: '53. Maximum Subarray',
    titleZh: '53. 最大子数组和',
    approaches: { 'brute force': subarrayBruteForce, tabulation: subarrayTabulation, 'space-optimized': subarraySpaceOptimized },
    inputs: [
      { label: '10,000 numbers', labelZh: '10,000 个数', build: () => [randomIntegers(10_000, { seed: 53 })] },
      { label: '1,000,000 numbers', labelZh: '1,000,000 个数', build: () => [randomIntegers(1e6, { seed: 530 })], slow: ['brute force'] },
    ],
    check: () => [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
    expected: 6,
  },
  {
    id: '0116-populating-next-right-pointers-in-each-node',
    title: '116. Populating Next Right Pointers in Each Node',
    titleZh: '116. 填充每个节点的下一个右侧节点指针',
    approaches: { 'pre-order': connectPreOrder, iteration: connectIteration },
    inputs: [{ label: '65,535 nodes', labelZh: '65,535 个结点', build: () => [perfectTree(16)] }],
    check: () => [perfectTree(3)],
    expected: '0,#,0,0,#,0,0,0,0,#',
    answer: readByNext,
    fresh: true,
  },
  {
    id: '0121-best-time-to-buy-and-sell-stock',
    title: '121. Best Time to Buy and Sell Stock',
    titleZh: '121. 买卖股票的最佳时机',
    approaches: { 'brute force': stockBruteForce, tabulation: stockTabulation, 'space-optimized': stockSpaceOptimized },
    inputs: [
      { label: '20,000 days', labelZh: '20,000 天', build: () => [randomIntegers(20_000, { min: 0, max: 1e4, seed: 121 })] },
      { label: '1,000,000 days', labelZh: '1,000,000 天', build: () => [randomIntegers(1e6, { min: 0, max: 1e4, seed: 1210 })], slow: ['brute force'] },
    ],
    check: () => [[7, 1, 5, 3, 6, 4]],
    expected: 5,
  },
  {
    id: '0256-paint-house',
    title: '256. Paint House',
    titleZh: '256. 粉刷房子',
    approaches: { 'brute force': paintBruteForce, memoization: paintMemoization, tabulation: paintTabulation },
    inputs: [
      { label: '20 houses', labelZh: '20 栋房子', build: () => [houses(20, 256)] },
      { label: '10,000 houses', labelZh: '10,000 栋房子', build: () => [houses(10_000, 2560)], slow: ['brute force', 'memoization'] },
    ],
    check: () => [[[17, 2, 17], [16, 16, 5], [14, 3, 19]]],
    expected: 10,
  },
  {
    id: '0322-coin-change',
    title: '322. Coin Change',
    titleZh: '322. 零钱兑换',
    approaches: { 'brute force': coinsBruteForce, memoization: coinsMemoization, tabulation: coinsTabulation },
    inputs: [
      { label: 'amount 28', labelZh: '金额 28', build: () => [[1, 2, 5], 28] },
      { label: 'amount 10,000', labelZh: '金额 10,000', build: () => [[1, 2, 5], 10_000], slow: ['brute force', 'memoization'] },
    ],
    check: () => [[1, 2, 5], 11],
    expected: 3,
  },
  {
    id: '0509-fibonacci-number',
    title: '509. Fibonacci Number',
    titleZh: '509. 斐波那契数',
    approaches: { recursion: fibRecursion, memoization: fibMemoization, tabulation: fibTabulation, 'space-optimized': fibSpaceOptimized, 'fast doubling': fibFastDoubling },
    inputs: [{ label: 'n = 32', labelZh: 'n = 32', build: () => [32] }],
    check: () => [20],
    expected: 6765,
  },
  {
    id: '0752-open-the-lock',
    title: '752. Open the Lock',
    titleZh: '752. 打开转盘锁',
    approaches: { bfs: lockBfs, 'bidirectional bfs': lockBidirectional },
    inputs: [{ label: '"8888", 8 dead ends', labelZh: '"8888"，8 个死亡数字', build: () => [['0001', '0010', '0100', '1000', '9999', '8889', '8898', '8988'], '8888'] }],
    check: () => [['0201', '0101', '0102', '1212', '2002'], '0202'],
    expected: 6,
  },
  {
    id: '1143-longest-common-subsequence',
    title: '1143. Longest Common Subsequence',
    titleZh: '1143. 最长公共子序列',
    approaches: { 'brute force': lcsBruteForce, memoization: lcsMemoization, tabulation: lcsTabulation },
    inputs: [
      { label: '2 × 12 letters', labelZh: '2 × 12 个字母', build: () => ['abcdefghijkl', 'mnopqrstuvwx'] },
      { label: '2 × 1,000 letters', labelZh: '2 × 1,000 个字母', build: () => [text(1_000, 'abcd', 1143), text(1_000, 'abcd', 11430)], slow: ['brute force'] },
    ],
    check: () => ['abcde', 'ace'],
    expected: 3,
  },
  {
    id: '1221-split-a-string-in-balanced-strings',
    title: '1221. Split a String in Balanced Strings',
    titleZh: '1221. 分割平衡字符串',
    approaches: { 'regex window': splitRegex, 'balance counter': splitCounter },
    inputs: [{ label: '20,000 letters, one piece', labelZh: '20,000 个字母，只能切成一段', build: () => ['L'.repeat(10_000) + 'R'.repeat(10_000)] }],
    check: () => ['RLRRLLRLRL'],
    expected: 4,
  },
]

// This is an example check, not a proof for every input. In particular,
// normalization can intentionally discard detail, such as which palindrome.
export function checkRace(race) {
  const answers = Object.values(race.approaches).map(solve => (race.answer ?? (x => x))(solve(...race.check())))
  return {
    passed: answers.length > 0 && answers.every(answer => JSON.stringify(answer) === JSON.stringify(race.expected)),
    answer: answers[0],
    expected: race.expected,
  }
}

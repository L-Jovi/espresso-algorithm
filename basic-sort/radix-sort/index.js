/*
 * @Description: Radix sort implements by Javascript.
 * @FileName: index.js
 * O(n^m)
 * https://segmentfault.com/a/1190000021342923
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')

const radixSort = (array) => {
  // get max value which's bit is loop times
  const maxValue = Math.max(...array)

  // buckets
  const buckets = Array.from({ length: 10 }, () => [])

  const list = []
  let bit = 1     // current loop bit => 1 10 100
  while (bit < maxValue) {
    for (let i = 0; i < array.length; i++) {
      const num = array[i]

      // eg:
      // units => 521 % 10 = 1 => 1 / 1 = 1
      // decade => 521 % 100 = 21 => 21 / 20 = 2.1 => 2
      // hundreds => 521 % 1000 = 521 => 521 / 100 = 5.21 => 5
      const digit = Math.floor(num % (bit * 10) / bit)
      buckets[digit].push(num)
    }

    let index = 0
    for (let b of buckets) {
      while (b.length > 0) {
        list[index++] = b.shift()
      }
    }

    bit *= 10
  }

  return list
}

const array = randomArray.list10()
timer(radixSort, array)

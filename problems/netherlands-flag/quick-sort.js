/*
 * @Description: select 3 groups like [<] [=] [>] implements by Javascript rely on quick sort.
 * @Path: Evernote/application-fields/algorithm/basic-sort/三色荷兰国旗问题
 * @FileName: netherlands-flag/quick-sort.js
 */

const randomArray = require('../../libs/random-list')
const timer = require('../../libs/timer')
const swap = require('../../libs/swap')

const netherlandsFlag = (array, l, r, pivot) => {
  if (l === r) {
    return [l, r]
  }

  let indexSmallArea = l - 1
  let indexBigArea = r + 1
  let i = l

  while (i < indexBigArea) {
    if (array[i] < pivot) {
      swap(array, i++, ++indexSmallArea)
    } else if (array[i] > pivot) {
      // notice swaped number need to be compare in next iteration
      swap(array, i, --indexBigArea)
    } else {
      i++
    }
  }

  // return edge of equalArea
  // [ [start ... smallArea ... indexSmallArea] [start ... equalArea ... end] [indexBigArea ... bigArea ... end] ]
  return [indexSmallArea + 1, indexBigArea - 1]
}

/**
 * netherLandsFlag.
 *
 * @param {number|Array} array
 * @returns {(number|Array)}
 */
const process = (array, l, r) => {
  if (l >= r) {
    return
  }

  const pivot = array[r]
  console.log(`pivot: ${pivot}`)
  const equalArea = netherlandsFlag(array, l, r, pivot)
  console.log(`equalArea: ${equalArea}`)

  process(array, l, equalArea[0] - 1)
  process(array, equalArea[1] + 1, r)

  return array
}

const quickSort = (array) => {
  if (!array || array.length < 2) {
    return
  }
  return process(array, 0, array.length - 1)
}

const array = randomArray.list100()
timer(quickSort, array)

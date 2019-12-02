/*
 * @Description: Deduolication by Javascript.
 * @FileName: array-deduplication/sort-first.js
 * @Refer: [https://github.com/mqyqingfeng/Blog/issues/27]
 */

function unique(array) {
  const result = []
  array.sort()
  let seen = undefined

  for (let i = 0; i < array.length; i++) {
    const current = array[i]

    if (i === 0 || seen !== current) {
      result.push(current)
    }

    seen = current 
  }

  return result
}


// test
const array = [ 1, 1, '1' ]
console.log(unique(array))

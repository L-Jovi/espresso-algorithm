/*
 * @Description: Deduolication by Javascript.
 * @FileName: array-deduplication/set.js
 * @Refer: [https://github.com/mqyqingfeng/Blog/issues/27]
 */

function unique(array) {
  return [ ...new Set(array) ]
}


// test
const array = [ 1, 1, '1' ]
console.log(unique(array))

/*
 * @Description: Deduolication by Javascript.
 * @FileName: array-deduplication/extra-array.js
 * @Refer: [https://github.com/mqyqingfeng/Blog/issues/27]
 */

function unique(array) {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const current = array[i]

    if (result.indexOf(current) === -1) {
      result.push(current)
    }
  }

  return result
}


// test
const array = [ 1, 1, '1' ]
console.log(unique(array))

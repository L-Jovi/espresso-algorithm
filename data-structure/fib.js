//
// fib.js
//

function fib(n) {
  let a = 0
  let b = 1
  let tmp

  for (let i = 0; i < n; i++) {
    tmp = a
    a = b
    b = b + tmp
  }

  return a
}


// implements by recursion
function fibonacci(n) {
  if (n == 0 || n == 1) {
    return n

  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}


// main

console.log(fib(6))
console.log(fibonacci(6))

const timer = (fn, ...args) => {
  const start = Date.now()
  const result = fn(...args)
  const end = Date.now()

  console.log(`Wasting time: ${end - start}ms \n`)
  console.log('Sorted array', result)
}

module.exports = timer

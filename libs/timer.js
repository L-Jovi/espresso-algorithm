const timer = (fn, arg) => {
  const start = Date.now()
  const result = fn(arg)
  const end = Date.now()

  console.log(`Wasting time: ${end - start}ms \n`)
  console.log('Sorted array', result)
}

module.exports = timer

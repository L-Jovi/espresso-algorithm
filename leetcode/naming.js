/*
 * @Description: Convert LeetCode title to dir name as regular format.
 * @FileName: naming.js
 */

const mkdirp = require('mkdirp')
const fs = require('fs')


const naming = function(index, name) {
  let words = name.split(' ')
  console.log(words)

  if (!words[words.length - 1]) {
    words.pop()
  }

  words = words.map(function(w) {
    return w.toLowerCase()
  })

  return `${index}-${words.join('-')}`
}


const mkdir = function(dirName) {
  const path = `${__dirname}/${dirName}`
  console.log('Will create dir named: ', path)

  mkdirp(path, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Success mkdir.')
    }
  })
}


const touch = function(dirName) {
  const path = `${dirName}/index.js`
  console.log('Will create Javascript file named: ', path)

  fs.open(path, "wx", function (err, fd) {
    if (err) {
      console.log(err)
    } else {
      console.log('Success touch file.')

      fs.close(fd, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }
  })
}


const argv = process.argv
const dirName = naming(argv[2] || 0, argv[3] || '')
mkdir(dirName)
touch(dirName)

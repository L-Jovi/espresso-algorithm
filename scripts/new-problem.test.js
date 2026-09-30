import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { listFiles } from './lib/files.mjs'
import { folderName, slugify } from './new-problem.mjs'

describe('new-problem', () => {
  it('turns titles into LeetCode\'s URL names', () => {
    assert.equal(slugify('String to Integer (atoi)'), 'string-to-integer-atoi')
    assert.equal(slugify('Implement Trie (Prefix Tree)'), 'implement-trie-prefix-tree')
    assert.equal(slugify('Pow(x, n)'), 'powx-n')
    assert.equal(slugify('Two Sum II - Input Array Is Sorted'), 'two-sum-ii-input-array-is-sorted')
    assert.equal(slugify("Pascal's Triangle"), 'pascals-triangle')
    assert.equal(folderName(7, 'Reverse Integer'), '0007-reverse-integer')
  })

  // Every solution header names its problem, "LeetCode 322. Coin Change —",
  // so the folders in leetcode/ check the naming rule against real titles.
  it('names every existing problem folder the way its headers title it', () => {
    const headers = listFiles(file => /^leetcode\/\d{4}-[^/]+\/[^/]+\.(js|py|java|sql)$/.test(file) && !file.endsWith('.test.js') && !file.includes('/test_'))
    assert.ok(headers.length > 60)
    for (const file of headers) {
      const match = readFileSync(file, 'utf8').match(/LeetCode (\d+)\. (.+?)(?: \(Premium\))?(?: —|,|:|$)/m)
      assert.ok(match, `${file} has no "LeetCode N. Title" header`)
      assert.equal(`leetcode/${folderName(match[1], match[2])}`, file.slice(0, file.lastIndexOf('/')), file)
    }
  })
})

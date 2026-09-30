// Start a new LeetCode problem: `npm run new -- 322 "Coin Change" [technique]`.
//
// Creates leetcode/0322-coin-change/ with one approach file, named after
// its technique (brute-force.js unless another name is given), and a
// solution.test.js. The test starts with a placeholder case that fails, so
// `npm test` stays red until a real case is filled in. Existing folders and
// files are never overwritten.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * LeetCode's folder-style name for a title: lower case, only letters,
 * digits and single hyphens. "String to Integer (atoi)" becomes
 * "string-to-integer-atoi", as in the problem's URL.
 */
export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
}

export const folderName = (number, title) => `${String(number).padStart(4, '0')}-${slugify(title)}`

function solutionTemplate(number, title, slug) {
  return `/**
 * LeetCode ${number}. ${title} — https://leetcode.com/problems/${slug}/
 * TODO: the problem in one sentence of your own words; never copy the statement.
 *
 * TODO: the idea, and why it gives the right answer.
 *
 * Time: O(?). Space: O(?).
 */

export function solution() {
  // TODO: rename to the function name LeetCode uses, and solve.
}

if (import.meta.main) console.log(solution())
`
}

function testTemplate(technique) {
  const label = technique.replaceAll('-', ' ')
  return `import { checkApproaches } from '../../shared/check.js'
import { solution } from './${technique}.js'

checkApproaches({ '${label}': solution }, [
  // Replace this placeholder with LeetCode's examples and the edge cases.
  { input: [], expected: 'TODO' },
])
`
}

function main([number, title, technique = 'brute-force']) {
  if (!/^\d+$/.test(number ?? '') || !title?.trim() || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(technique)) {
    console.error('Usage: npm run new -- <number> "<official title>" [technique, such as hash-map]')
    process.exit(1)
  }
  const slug = slugify(title)
  const folder = join('leetcode', folderName(number, title))
  const files = [[join(folder, `${technique}.js`), solutionTemplate(Number(number), title.trim(), slug)], [join(folder, 'solution.test.js'), testTemplate(technique)]]
  const existing = files.filter(([path]) => existsSync(path)).map(([path]) => path)
  if (existing.length > 0) {
    console.error(`Already there, nothing written: ${existing.join(', ')}`)
    process.exit(1)
  }
  mkdirSync(folder, { recursive: true })
  for (const [path, content] of files) writeFileSync(path, content, { flag: 'wx' })
  console.log(`Created ${files.map(([path]) => path).join(' and ')}.`)
  console.log(`Check that the folder name matches the problem's URL: https://leetcode.com/problems/${slug}/`)
}

if (import.meta.main) main(process.argv.slice(2))

// Repository checks that tests cannot express: documentation links, the
// English/Chinese README pairs, the LeetCode indexes, the one-line
// description shared by the README and package.json, and that every module
// is reached by a test. It only reports drift; it never rewrites files.
import { existsSync, readFileSync } from 'node:fs'
import { basename, dirname, join, normalize } from 'node:path'
import { listFiles } from './lib/files.mjs'
import { LEGACY, PAGE_SCRIPTS, PROGRAMS, SECTIONS } from './lib/layout.mjs'

// English documents with a Simplified Chinese mirror next to them.
const MIRRORED = file => basename(file) === 'README.md' || (file.startsWith('docs/') && file !== 'docs/verification.md')
const SYNC_LINE = /^> 对应英文版：\d{4}-\d{2}-\d{2}。英文版更新后本页可能滞后。$/m
const TEXT = /\.(css|html|java|js|json|md|mjs|py|sql|txt|ya?ml)$|^(\.[a-z]+rc|\.git\w+|\.editorconfig|CODEOWNERS)$/

const problems = []
const report = (file, message) => problems.push(`${file}: ${message}`)
const isLegacy = file => LEGACY.some(folder => file.startsWith(folder))

const files = listFiles()
const markdown = files.filter(file => file.endsWith('.md') && !isLegacy(file))

for (const folder of LEGACY) {
  if (!files.some(file => file.startsWith(folder))) report(folder, 'listed in LEGACY but no longer exists; remove it from the list')
}

// Relative links and images must point at something that exists.
for (const file of markdown) {
  const text = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
  for (const [, target] of text.matchAll(/\]\(<?([^)\s>]+)>?(?:\s+"[^"]*")?\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue
    const path = normalize(join(dirname(file), decodeURI(target.split('#')[0])))
    if (!existsSync(path)) report(file, `broken link to ${target}`)
  }
}

// Every mirrored English document has a Chinese twin, both carry the
// language switch, and the twin says which English version it follows.
for (const file of markdown.filter(MIRRORED)) {
  if (file.endsWith('.zh-Hans.md')) continue
  const name = basename(file, '.md')
  const mirror = file.replace(/\.md$/, '.zh-Hans.md')
  if (!existsSync(mirror)) {
    report(file, `missing Simplified Chinese mirror ${basename(mirror)}`)
    continue
  }
  if (!readFileSync(file, 'utf8').includes(`English | [简体中文](${name}.zh-Hans.md)`)) {
    report(file, 'missing the language switch line')
  }
  const zh = readFileSync(mirror, 'utf8')
  if (!zh.includes(`[English](${name}.md) | 简体中文`)) report(mirror, 'missing the language switch line')
  if (!SYNC_LINE.test(zh)) report(mirror, 'missing the sync line "> 对应英文版：YYYY-MM-DD。英文版更新后本页可能滞后。"')
}
for (const file of markdown.filter(file => file.endsWith('.zh-Hans.md'))) {
  if (!existsSync(file.replace(/\.zh-Hans\.md$/, '.md'))) report(file, 'mirror without an English original')
}

// Both LeetCode indexes list every problem folder; a link to a folder that
// does not exist is already a broken link above.
const problemFolders = new Set(files.map(file => file.match(/^leetcode\/(\d{4}-[^/]+)\//)?.[1]).filter(Boolean))
for (const index of ['leetcode/README.md', 'leetcode/README.zh-Hans.md']) {
  const text = readFileSync(index, 'utf8')
  for (const folder of problemFolders) {
    if (!text.includes(`](${folder}/)`)) report(index, `does not list ${folder}/`)
  }
}

// The README's first paragraph is the repository's one-line description.
const { description } = JSON.parse(readFileSync('package.json', 'utf8'))
const intro = readFileSync('README.md', 'utf8').split('\n\n').map(part => part.trim())
  .find(part => part && !part.startsWith('#') && !part.startsWith('English |'))
if (intro !== description) report('README.md', 'first paragraph must equal the description in package.json')

// Every module in a converted section is imported by a test, directly or
// through another module, so no solution can silently go untested.
const relativeImports = file => [...readFileSync(file, 'utf8').matchAll(/^\s*import\s+(?:[^'"]*?\s+from\s+)?['"](\.{1,2}\/[^'"]+)['"]/gm)]
  .map(([, specifier]) => normalize(join(dirname(file), specifier)))
const reached = new Set()
const pending = files.filter(file => file.endsWith('.test.js'))
while (pending.length > 0) {
  const file = pending.pop()
  for (const target of relativeImports(file)) {
    if (!reached.has(target) && existsSync(target)) {
      reached.add(target)
      pending.push(target)
    }
  }
}
for (const file of files.filter(file => SECTIONS.some(section => file.startsWith(section)))) {
  if (!/\.m?js$/.test(file) || file.endsWith('.test.js') || PROGRAMS.includes(file) || PAGE_SCRIPTS.includes(file)) continue
  if (!reached.has(file)) report(file, 'is not imported by any test')
}

// The site's scripts, and every module they import, must load in a browser:
// relative imports only, spelled with the exact case of the file (the web
// server is case-sensitive even where a disk is not), and no node: modules.
const tracked = new Set(files)
const pageModules = new Set()
const toLoad = [...PAGE_SCRIPTS]
while (toLoad.length > 0) {
  const file = toLoad.pop()
  if (pageModules.has(file)) continue
  pageModules.add(file)
  for (const [, specifier] of readFileSync(file, 'utf8').matchAll(/^\s*import\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]/gm)) {
    if (!/^\.{1,2}\//.test(specifier)) {
      report(file, `imports ${specifier}, which a browser page cannot load`)
      continue
    }
    const target = normalize(join(dirname(file), specifier))
    if (tracked.has(target)) toLoad.push(target)
    else report(file, `imports ${specifier}, which matches no file's exact name`)
  }
}

// The local links and assets of the site's pages point at files that exist.
for (const file of files.filter(file => file.endsWith('.html') && !isLegacy(file))) {
  for (const [, target] of readFileSync(file, 'utf8').matchAll(/\b(?:href|src)="([^"#?]+)/g)) {
    if (/^[a-z]+:/i.test(target)) continue
    const path = normalize(join(dirname(file), target))
    if (!tracked.has(target.endsWith('/') ? join(path, 'index.html') : path)) report(file, `links to ${target}, which does not exist`)
  }
}

// Absolute home paths leak a machine layout into a public repository.
for (const file of files.filter(file => TEXT.test(basename(file)) || TEXT.test(file))) {
  if (/\/(Users|home)\/[a-z]/i.test(readFileSync(file, 'utf8'))) report(file, 'contains an absolute home path')
}

if (problems.length > 0) {
  console.error(problems.map(problem => `✖ ${problem}`).join('\n'))
  console.error(`\n${problems.length} problem(s) found.`)
  process.exit(1)
}
console.log(`✔ Repository checks passed (${markdown.length} Markdown files; legacy folders: ${LEGACY.join(', ') || 'none'}).`)

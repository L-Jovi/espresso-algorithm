// Build the GitHub Pages site: `node scripts/build-pages.mjs [folder]`, into
// _site/ by default.
//
// The site is the repository itself, trimmed. Each page sits next to the
// code it imports, so every relative import resolves the same way in the
// repository, on a local server and on the web. The build copies the
// pages, their styles and icons, and the JavaScript modules of the
// sections; it leaves out tests and their helpers, programs, Python,
// Java, SQL and Markdown.
import { copyFileSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { listFiles } from './lib/files.mjs'
import { PROGRAMS, SECTIONS } from './lib/layout.mjs'

const PAGE_FOLDERS = ['assets/', 'visualizer/']

export function sitePaths() {
  return listFiles(file =>
    (file === 'index.html' || [...PAGE_FOLDERS, ...SECTIONS].some(folder => file.startsWith(folder))) &&
    /\.(html|js|css|svg)$/.test(file) &&
    !file.endsWith('.test.js') &&
    !PROGRAMS.includes(file) &&
    // Test helpers such as shared/check.js import node:test; pages never load them.
    !(file.endsWith('.js') && /from\s+'node:/.test(readFileSync(file, 'utf8'))))
}

if (import.meta.main) {
  const out = process.argv[2] ?? '_site'
  rmSync(out, { recursive: true, force: true })
  const paths = sitePaths()
  for (const file of paths) {
    mkdirSync(join(out, dirname(file)), { recursive: true })
    copyFileSync(file, join(out, file))
  }
  console.log(`Copied ${paths.length} files into ${out}/.`)
}

// Where the code lives. The change that converts a folder moves it from
// LEGACY to SECTIONS; the reorganization is finished when LEGACY is empty.

/** Folders that still use the pre-2026 layout; the repository checks skip them. */
export const LEGACY = []

/** Converted folders: every module in them must be reached by a test. */
export const SECTIONS = ['data-structures/', 'leetcode/', 'nlp/', 'problems/', 'searching/', 'shared/', 'sorting/', 'visualizer/']

/** Programs rather than modules; they are run by hand, not imported by tests. */
export const PROGRAMS = ['leetcode/bench.js', 'nlp/word-segmentation/compare.js', 'sorting/bench.js']

/**
 * Scripts that run only in a page of the site. Tests cannot import them,
 * because they draw on the page; scripts/test-pages.mjs runs them in
 * browsers instead, and the repository checks make sure that they and every
 * module they import can load in a browser.
 */
export const PAGE_SCRIPTS = [
  'assets/demo.js',
  'leetcode/race/race-worker.js',
  'leetcode/race/race.js',
  'nlp/word-segmentation/page.js',
  'visualizer/visualizer.js',
]

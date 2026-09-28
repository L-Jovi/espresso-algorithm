// Where the code lives. The change that converts a folder moves it from
// LEGACY to SECTIONS; the reorganization is finished when LEGACY is empty.

/** Folders that still use the pre-2026 layout; the repository checks skip them. */
export const LEGACY = ['algorithm-canvas/', 'leetcode/']

/** Converted folders: every module in them must be reached by a test. */
export const SECTIONS = ['data-structures/', 'problems/', 'searching/', 'shared/', 'sorting/']

/** Programs rather than modules; they are run by hand, not imported by tests. */
export const PROGRAMS = ['sorting/bench.js']

// List repository files the way git sees them: tracked files plus new files
// that are not ignored. Walking the directory tree instead would also pick up
// nested worktrees under .claude/ and anything listed in .gitignore.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

export function listFiles(predicate = () => true) {
  const output = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    { encoding: 'utf8' },
  )
  const files = new Set(output.split('\0').filter(Boolean))
  // A file deleted in the working tree is still listed until the deletion is staged.
  return [...files].filter(file => existsSync(file) && predicate(file)).sort()
}

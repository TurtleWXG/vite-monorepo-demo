import { resolve } from 'node:path'
import process from 'node:process'

export function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

import path, { resolve } from 'node:path'
import process from 'node:process'

const repoRoot = path.resolve(__dirname, '..')

export function monorepoResolver(pkgName: string) {
  return path.join(repoRoot, 'packages', pkgName, 'src')
}

export function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export const isDev = (env: string) => env === 'development'

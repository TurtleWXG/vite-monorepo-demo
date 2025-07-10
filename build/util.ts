import path, { resolve } from 'node:path'
import process from 'node:process'

/**
 * Repo root
 */
const repoRoot = path.resolve(__dirname, '..')

/**
 * 获取 packages 包的源代码路径。
 *
 * @param pkgName - 包名
 * @returns 包的源代码路径
 */
export function monorepoResolver(pkgName: string) {
  return path.join(repoRoot, 'packages', pkgName, 'src')
}

/**
 * 解析路径为绝对路径。
 * 该函数基于当前工作目录（process.cwd）解析给定目录路径，
 * 确保返回标准化的绝对路径格式。
 *
 * @param dir - 需要解析的相对路径或目录名
 * @returns 解析后的绝对路径字符串
 */
export function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

/**
 * 判断当前环境是否为开发环境。
 *
 * @param env - 当前环境变量
 * @returns 如果当前环境是开发环境则返回 true，否则返回 false
 */
export const isDev = (env: string) => env === 'development'

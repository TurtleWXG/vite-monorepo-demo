import { defineConfig, PluginOption } from 'vite'
import { loadEnv } from 'vite'
import { monorepoResolver } from '../../build'
import { getPluginsList } from '../../build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const _isBuild = mode === 'production'
  const _env = loadEnv(mode, process.cwd())

  return {
    plugins: <PluginOption[]>[...getPluginsList(mode)],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData:
            '@use "@mgmt/styles/mixin.scss" as *;' +
            '@use "@mgmt/styles/variable.scss" as *;' +
            '@use "@mgmt/styles/element-plus/index.scss" as *;'
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /@mgmt/,
          replacement: `${monorepoResolver('mgmt')}/`
        }
      ],
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css']
    },
    optimizeDeps: {
      include: ['axios', 'lodash-es', 'dayjs', 'pinia', 'nprogress', 'ts-md5'],
      exclude: ['@iconify/json']
    }
  }
})

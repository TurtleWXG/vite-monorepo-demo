import { defineConfig, PluginOption } from 'vite'
import { getPluginsList } from '../../build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const isBuild = mode === 'production'
  return {
    plugins: <PluginOption[]>[...getPluginsList(mode)],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
})

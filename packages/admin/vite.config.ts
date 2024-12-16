import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { pathResolve } from '../../build'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isBuild = mode === 'production'
  const env = loadEnv(mode, process.cwd())
  console.log('defineConfig => env:', env)

  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        imports: [{ 'element-plus/es': ['ElMessage', 'ElMessageBox', 'ElNotification'] }],
      }),
      Components({
        dts: 'src/auto-components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: isBuild ? 'sass' : false,
          }),
        ],
      }),
      {
        name: 'import-element-plus-style',
        transform(code, id) {
          if (!/src\/main.ts$/.test(id)) return

          return `${code};${
            isBuild
              ? "import 'element-plus/theme-chalk/src/message-box.scss';" +
                "import 'element-plus/theme-chalk/src/message.scss';" +
                "import 'element-plus/theme-chalk/src/notification.scss';"
              : "import 'element-plus/theme-chalk/src/index.scss';"
          }`
        },
      },
      ElementPlus({}),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@admin/styles/element-plus/index.scss" as *;`,
          // 解决警告 Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /@admin/,
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },
    optimizeDeps: {
      include: ['axios', 'lodash-es', 'dayjs', 'pinia', 'nprogress', 'ts-md5'],
      exclude: ['@iconify/json'],
    },
  }
})

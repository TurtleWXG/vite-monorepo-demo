import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { loadEnv } from 'vite'
import { monorepoResolver } from '../../build'

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
      ElementPlus({
        useSource: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData:
            '@use "@admin/styles/mixin.scss" as *;' +
            '@use "@admin/styles/variable.scss" as *;' +
            '@use "@admin/styles/element-plus/index.scss" as *;',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /@admin/,
          replacement: `${monorepoResolver('admin')}/`,
        },
        {
          find: /@base-lib/,
          replacement: `${monorepoResolver('base-lib')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css'],
    },
    optimizeDeps: {
      include: ['axios', 'lodash-es', 'dayjs', 'pinia', 'nprogress', 'ts-md5'],
      exclude: ['@iconify/json'],
    },
  }
})

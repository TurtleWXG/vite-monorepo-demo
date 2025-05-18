import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import type { PluginOption } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import svgLoader from 'vite-svg-loader'

export function getPluginsList(mode: string): PluginOption[] {
  const isBuild = mode === 'production'

  return [
    vue(),
    vueDevTools(),
    codeInspectorPlugin({
      bundler: 'vite',
      hideConsole: true
    }),
    UnoCSS(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      imports: [{ 'element-plus/es': ['ElMessage', 'ElMessageBox', 'ElNotification'] }]
    }),
    Components({
      dts: 'src/auto-components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: isBuild ? 'sass' : false
        })
      ]
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
      }
    } satisfies PluginOption,
    ElementPlus({
      useSource: true
    }),
    // svg组件化支持
    svgLoader()
  ]
}

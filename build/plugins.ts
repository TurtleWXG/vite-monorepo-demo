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
import { isDev } from './util'

export function getPluginsList(env: string): PluginOption[] {
  return [
    /**
     * 提供 Vue 3 单文件组件支持
     */
    vue(),
    /**
     * 添加 Vue DevTools 支持
     * https://devtools-next.vuejs.org/guide/vite-plugin
     */
    vueDevTools(),
    /**
     * 点击页面上的 DOM，它能够自动打开你的 IDE 并将光标定位到 DOM 对应的源代码位置
     * https://inspector.fe-dev.cn
     */
    codeInspectorPlugin({
      bundler: 'vite',
      hideConsole: true
    }),
    /**
     * UnoCSS  UnoCSS 是一个原子 CSS 引擎，用于将 CSS 转换为原子 CSS
     * https://unocss.dev
     */
    UnoCSS(),
    /**
     * 按需自动导入 API
     * https://github.com/unplugin/unplugin-auto-import#readme
     */
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      imports: [{ 'element-plus/es': ['ElMessage', 'ElMessageBox', 'ElNotification'] }]
    }),
    /**
     * 按需自动导入组件
     * https://github.com/antfu/unplugin-vue-components#readme
     */
    Components({
      dts: 'src/auto-components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: isDev(env) ? false : 'sass'
        })
      ]
    }),
    /**
     * 引入 element-plus 的样式
     * 在开发环境默认导入全部样式，解决动态识别导致页面白屏时间过长
     * 在非开发环境，默认导入element-plus命令式组件的必要样式
     */
    {
      name: 'import-element-plus-style',
      transform(code, id) {
        if (!/src\/main.ts$/.test(id)) return

        return `${code};${
          isDev(env)
            ? "import 'element-plus/theme-chalk/src/index.scss';"
            : "import 'element-plus/theme-chalk/src/message-box.scss';" +
              "import 'element-plus/theme-chalk/src/message.scss';" +
              "import 'element-plus/theme-chalk/src/notification.scss';"
        }`
      }
    } satisfies PluginOption,
    /**
     * 和import-element-plus-style配合使用
     * 在非开发环境，默认导入element-plus已使用组件的必要样式
     */
    ElementPlus({
      useSource: true
    }),
    /**
     * svg组件化支持 svg-loader
     * https://github.com/visualfanatic/vite-svg-loader
     */
    svgLoader()
  ]
}

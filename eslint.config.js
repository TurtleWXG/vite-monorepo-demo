import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsEslint.parser,
      },
    },
    rules: {
      // vue 组件名称驼峰规范
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
    },
  },
  {
    files: ['**/*.{vue,ts,tsx}'],
    rules: {
      // 声明的属性未使用
      '@typescript-eslint/no-unused-vars': 'warn',
      // 使用 any 类型
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    global: {
      ElMessage: 'readonly',
      ElMessageBox: 'readonly',
      ElNotification: 'readonly',
    },
  },
  // 最后面的配置会覆盖前面的配置
  eslintConfigPrettier,
]

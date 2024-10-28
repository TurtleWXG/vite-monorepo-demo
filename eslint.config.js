import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
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
      // vue 组件中使用了未声明的属性
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // 最后面的配置会覆盖前面的配置
  eslintConfigPrettier,
]

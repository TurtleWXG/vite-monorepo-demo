import GXEslintConfig from '@gx-web/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...GXEslintConfig,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'warn',
        { allowWithName: 'Props$', allowInterfaces: 'with-single-extends' }
      ]
    }
  }
])

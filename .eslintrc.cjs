module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': 0
  }
}

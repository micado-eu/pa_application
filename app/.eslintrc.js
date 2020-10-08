module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off'
  }
}

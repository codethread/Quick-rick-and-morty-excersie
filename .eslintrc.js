module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'func-names': 'off',
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      { 'singleQuote': true }
    ],
    // "no-use-before-define": ["error", { "functions": false }]
  },
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  settings: {}
}

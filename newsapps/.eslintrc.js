module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['universe/native'],
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        trailingComma: 'all',
        endOfLine: 'lf',
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        semi: false,
      },
    ],
  },
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'never'],
    'no-empty': 0,
    'no-underscore-dangle': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'max-len': ['error', { 'code': 120 }]
  },
};

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: { 'es6': true },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: true,
    mocha: true,
    jest: true,
  },
};
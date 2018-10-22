module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],

  parser: 'babel-eslint',

  rules: {
    'no-console': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};

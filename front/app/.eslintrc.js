module.exports = {
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    // 'plugin:import/recommended',  //  ??? Error: Cannot find module '/node_modules/monaco-editor/webpack.config.babel.js'
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    'plugin:import/typescript',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],

  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
      },
    },
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  rules: {
    // js
    'object-curly-spacing': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: false,
    //     optionalDependencies: false,
    //     peerDependencies: false,
    //   },
    // ],

    'import/no-cycle': 'off',
    'import/export': 'off',
    // jsx
    'react/sort-comp': 'off',
    'react/destructuring-assignment': 1,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': ['error', { specialLink: ['to'] }],
    'jsx-a11y/label-has-for': [2, { allowChildren: true }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    // ts
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-restricted-globals': 'off',
    'no-redeclare': 'off',
    'no-inner-declarations': ['off', 'functions'],
    'no-useless-constructor': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'class-methods-use-this': 'off',
    // tsx
    'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
  },
};

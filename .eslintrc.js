module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    globals: {
        page: true,
        browser: true,
        __dirname: true,
        describe: true,
        beforeAll: true,
        it: true,
        afterAll: true,
        expect: true,
        jest: true,
        process: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            experimentalDecorators: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/jsx-uses-react': 'error',
        'no-console': 'off',
        'react/jsx-uses-vars': 'error',
        'react/jsx-no-bind': [
            'error',
            {
                ignoreRefs: true,
                allowArrowFunctions: true,
                allowFunctions: true,
                allowBind: true
            }
        ],
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};

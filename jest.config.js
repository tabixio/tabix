const path = require('path');
module.exports = {
    verbose: true,
    moduleDirectories: [
        'node_modules',
        path.resolve(__dirname, 'src/'),
        path.resolve(__dirname, 'src/components/')
    ],
    setupFiles: ['raf/polyfill', './__tests__/jestsetup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: ['**/__tests__/**[^e2e]/*.test.js?(x)']
};

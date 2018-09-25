/*
 * For forked process configuration use as module: getCustomTransformers: path.resolve('./webpack.ts-transformers.js').
 */

const tsImportPluginFactory = require('ts-import-plugin');

const antdTransformer = tsImportPluginFactory({
  libraryDirectory: 'es',
  libraryName: 'antd',
  style: 'css',
});

function getCustomTransformers() {
  return { before: [antdTransformer] };
}

module.exports = getCustomTransformers;

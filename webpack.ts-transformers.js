/*
 * For forked process configuration use as module: getCustomTransformers: path.resolve('./webpack.ts-transformers.js').
 */

const tsImportPluginFactory = require('ts-import-plugin');

const antdTransformer = tsImportPluginFactory({
  libraryName: 'antd',
  libraryDirectory: 'es',
  // style: 'css',
  style: true,
});

function getCustomTransformers() {
  return { before: [antdTransformer] };
}

module.exports = getCustomTransformers;

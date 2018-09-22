/*
 * For forked process configuration use as module: getCustomTransformers: path.resolve('./webpack.ts-transformers.js')
 */

import tsImportPluginFactory from 'ts-import-plugin';

const antdTransformer = tsImportPluginFactory({
  libraryDirectory: 'es',
  libraryName: 'antd',
  style: 'css',
});

export default function getCustomTransformers() {
  return { before: [antdTransformer] };
}

module.exports = getCustomTransformers;

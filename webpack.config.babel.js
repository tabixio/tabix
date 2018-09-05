import path from 'path';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import tsImportPlugin from 'ts-import-plugin';
import paths from '@vzh/configs/paths';
import clientConfigTs, { baseDefaultRules } from '@vzh/configs/webpack/client.config.ts';
import loaders from '@vzh/configs/webpack/loaders';

const config = webpackMerge(
  clientConfigTs({
    rhl: false,

    entry: {
      app: ['./index'],
    },

    rules: {
      tsRule: {
        ...baseDefaultRules.tsRule,
        use: loaders.ts({
          tsconfig: path.join(paths.client.root, 'tsconfig.json'),
          forkedChecks: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPlugin({
                libraryDirectory: 'es',
                libraryName: 'antd',
                style: 'css',
              }),
            ],
          }),
          compilerOptions: {
            module: 'esnext',
            resolveJsonModule: false,
          },
        }),
      },
    },
  }),
  {
    module: {
      rules: [{ test: /\.pug$/, loader: 'pug-loader' }],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: path.join(paths.client.assets, 'index.pug'),
        filename: 'index.html',
      }),
    ],
  }
);

// console.log(config);

export default config;

import path from 'path';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import paths from '@vzh/configs/paths';
import clientConfigTs from '@vzh/configs/webpack/client.config.ts';

export default webpackMerge(
  clientConfigTs({
    rhl: false,

    entry: {
      app: ['./index'],
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

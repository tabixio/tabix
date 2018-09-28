import path from 'path';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import paths from '@vzh/configs/paths';
import clientConfigTs, { baseDefaultRules } from '@vzh/configs/webpack/client.config.ts';
import { defaultRules } from '@vzh/configs/webpack/client.config';
import loaders from '@vzh/configs/webpack/loaders';
import lessVars from './webpack.less-vars';
// import webpack from 'webpack';
// import appEnv from '@vzh/configs/appEnv';

const config = webpackMerge(
  clientConfigTs({
    rhl: false,

    entry: {
      app: ['./index'],
    },

    rules: {
      jsRule: {},

      tsRule: {
        ...baseDefaultRules.tsRule,
        use: loaders.ts({
          tsconfig: path.join(paths.client.root, 'tsconfig.json'),
          forkedChecks: true,
          getCustomTransformers: path.resolve('./webpack.ts-transformers.js'),
          compilerOptions: {
            module: 'es2015',
            resolveJsonModule: false,
          },
        }),
      },

      cssNodeModulesRule: {
        ...defaultRules.cssNodeModulesRule,
        exclude: [
          path.join(paths.nodeModules.root, 'monaco-editor'),
          path.join(paths.nodeModules.root, 'antd'),
        ],
      },

      antdCssRule: {
        test: /\.less$/,
        include: path.join(paths.nodeModules.root, 'antd'),
        use: [
          defaultRules.cssNodeModulesRule.use[0], // <-- style-loader
          ...loaders.cssNodeModules({ modules: false, postcss: false }),
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: lessVars,
            },
          },
        ],
      },

      monacoCssRule: {
        ...defaultRules.cssNodeModulesRule,
        include: path.join(paths.nodeModules.root, 'monaco-editor'),
        use: [
          defaultRules.cssNodeModulesRule.use[0], // <-- style-loader
          ...loaders.cssNodeModules({ modules: false, postcss: false }),
        ],
      },

      pugRule: { test: /\.pug$/, use: { loader: 'pug-loader' } },
    },
  }),
  {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: path.join(paths.client.assets, 'index.pug'),
        filename: 'index.html',
      }),
      new MonacoWebpackPlugin({ output: 'workers', languages: [] }),
      // ...appEnv.ifDevMode([], [new webpack.HotModuleReplacementPlugin()]),
    ],
  }
);

// console.log(JSON.stringify(config));

export default config;

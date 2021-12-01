import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import lessVars from './webpack.less-vars';

const baseDir = process.cwd();
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// Environment config
// const isDevelopment = process.env.NODE_ENV !== 'production';
// const mode = isDevelopment ? 'development' : 'production';
const mode = 'development';

export default {
  target: 'web',
  context: path.resolve(baseDir, 'app/src'),

  entry: {
    app: ['./index'],
  },

  output: {
    path: path.resolve(baseDir, 'dist'),
    publicPath: '/',
    filename: path.join('js', `[name].js?[hash:5]`),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(baseDir, 'node_modules'), baseDir, path.resolve(baseDir, 'app/src')],
  },

  mode,

  devtool: 'cheap-module-eval-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'reactvendor',
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: 'utilityVendor',
        },
        bootstrapVendor: {
          test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
          name: 'bootstrapVendor',
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: 'vendor',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(baseDir, 'app/src')],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(baseDir, 'app/tsconfig.json'),
            transpileOnly: true,
            happyPackMode: false,
            getCustomTransformers: path.resolve('./webpack.ts-transformers.js'),
          },
        },
      },

      {
        test: /\.css$/,
        include: [path.resolve(baseDir, 'app/src')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:5]',
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.css$/,
        include: [path.resolve(baseDir, 'node_modules')],
        exclude: [path.join(baseDir, 'node_modules', 'antd')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.less$/,
        include: [path.resolve(baseDir, 'node_modules', 'antd')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: lessVars,
            },
          },
        ],
      },

      { test: /\.pug$/, use: { loader: 'pug-loader' } },

      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        include: [path.resolve(baseDir, 'app/src/assets'), path.resolve(baseDir, 'node_modules')],
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: 'file-loader',
            name: `assets/[name].[ext]?[hash:base64:5]`,
          },
        },
      },
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false, // http://127.0.0.1:8888/
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new CompressionPlugin(),
    new ForkTsCheckerPlugin(),

    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(baseDir, 'app/src/assets', 'index.pug'),
      filename: 'index.html',
    }),
    new MonacoWebpackPlugin({ output: 'workers', languages: ['sql'] }),
  ],

  devServer: {
    contentBase: path.resolve(baseDir, 'app/public'),
    publicPath: '/',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
    hotOnly: true,
    noInfo: false,
    stats: 'minimal',
  },
};

import webpack from 'webpack';
import path from 'path';
// Import Settings
// import TerserJSPlugin from 'terser-webpack-plugin';
import lessVars from './webpack/less-vars';
// ---------- Plugins ------------------------------------------------------------
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// -------------------------------------------------------------------------------
const baseDir = process.cwd();
const mode = process.env.NODE_ENV ? 'development' : 'production';
const isProd = mode === 'production';
const isDev = !isProd;
const devServerHost = '0.0.0.0'; // isWindows() ? '127.0.0.1' : '0.0.0.0';
// -------------------------------------------------------------------------------
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// -------------------------------------------------------------------------------
const performance = {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000,
};
const optimization = {
  minimize: true,
  minimizer: [
    //    new TerserPlugin({
    //      parallel: true,
    //      terserOptions: {
    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    //      },
    // }),
  ],
  runtimeChunk: {
    name: 'runtime',
  },

  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
        maxAsyncRequests: 20,
        minSize: 100000,
      },
    },
  },
};
const devServer = {
  client: {
    overlay: false,
  },

  historyApiFallback: true,
  host: devServerHost,
  port: 9000,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  static: {
    publicPath: '/',
    directory: path.resolve(baseDir, 'app/public'),
  },
  // noInfo: false,
  // stats: 'minimal',
};
// -------------------------------------------------------------------------------
// Customize the webpack build process
const plugins = [
  // Removes/cleans build folders and unused assets when rebuilding
  new CleanWebpackPlugin(),
  new ForkTsCheckerPlugin({
    typescript: {
      memoryLimit: 2048,
      configFile: path.resolve(baseDir, 'app/tsconfig.json'),
    },
    // tsconfig: path.resolve(baseDir, 'app/tsconfig.json'),
    // checkSyntacticErrors: false,
    // memoryLimit: 2024,
  }),
  // new BundleAnalyzerPlugin({
  //   openAnalyzer: false, // http://127.0.0.1:8888/
  // }),
  new HtmlWebpackPlugin({
    title: 'Tabix',
    // favicon: `${paths.src}/images/favicon.png`,
    inject: false,
    template: path.join(baseDir, 'app/src/assets', 'index.pug'),
    filename: 'index.html',
  }),
  new MonacoWebpackPlugin({ output: 'workers', languages: ['sql'] }),
];
// -------------------------------------------------------------------------------
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
    fallback: { fs: false }, // For antlr4!
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(baseDir, 'node_modules'), baseDir, path.resolve(baseDir, 'app/src')],
  },

  // stats: {
  //   all: false,
  //   assets: true,
  //   // excludeAssets: !assetName.endsWith(".js")),
  //   assetsSort: '!size',
  //   errors: true,
  // },
  module: {
    rules: [
      // ts-loader
      {
        test: /\.tsx?$/,
        include: [path.resolve(baseDir, 'app/src')],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(baseDir, 'app/tsconfig.json'),
            transpileOnly: true,
            happyPackMode: false,
            getCustomTransformers: path.resolve('./webpack/webpack.ts-transformers.js'),
          },
        },
      },
      // CSS s
      {
        test: /\.css$/,
        include: [path.resolve(baseDir, 'app/src')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // postcssOptions: {
              //   config: path.resolve('./webpack/postcss.config.js'),
              // },
              modules: true,
              localIdentName: '[name]__[local]--[hash:5]',
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      // Css - modules
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
      // Less
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
      // PUG
      { test: /\.pug$/, use: { loader: 'pug-loader' } },
      // IMG
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
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  optimization,
  plugins,
  mode,
  devServer,
  performance,
};

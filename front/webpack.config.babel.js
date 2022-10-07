import path from 'path';
import antdLessVars from './webpack/antd.less.vars';
// ---------- Plugins ------------------------------------------------------------
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { getThemeVariables } = require('antd/dist/theme');
const PACKAGE = require('./package.json');

const VersionBuild = PACKAGE.version;
// -------------------------------------------------------------------------------
const baseDir = process.cwd();
const devServerHost = '0.0.0.0'; // isWindows() ? '127.0.0.1' : '0.0.0.0';
// -------------------------------------------------------------------------------
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// -------------------------------------------------------------------------------
// process.traceDeprecation = true;
// -------------------------------------------------------------------------------
const performance = {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000,
};
const optimization = {
  removeAvailableModules: false,

  runtimeChunk: {
    name: 'runtime',
  },
  moduleIds: 'deterministic',

  splitChunks: {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      // reactVendor: {
      //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      //   name: 'reactvendor',
      // },
      commons: {
        // test: /[\\/]node_modules[\\/](!react-bootstrap)(!react)(!react-dom)[\\/]/,
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
  compress: true,
  hot: true,
  liveReload: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  static: {
    publicPath: '/',
    directory: path.resolve(baseDir, 'app/public'),
  },
  // stats: 'minimal',
};
// -------------------------------------------------------------------------------
const plugins = [
  // Removes/cleans build folders and unused assets when rebuilding
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    BUILD_VERSION: JSON.stringify(VersionBuild),
    BUILD_TIME: Date.now(),
  }),
  new ForkTsCheckerPlugin({
    typescript: {
      memoryLimit: 2048,
      configFile: path.resolve(baseDir, 'app/tsconfig.json'),
    },
  }),
  // new CompressionPlugin(),
  // new BundleAnalyzerPlugin({
  //   openAnalyzer: false, // http://127.0.0.1:8888/
  // }),
  new HtmlWebpackPlugin({
    title: 'Tabix',
    // favicon: `${paths.src}/images/favicon.png`,
    inject: false,
    hash: true, // Cache busting
    template: path.join(baseDir, 'app/src/assets', 'index.pug'),
    filename: 'index.html',
  }),
  new MonacoWebpackPlugin({ output: 'workers', languages: ['sql'] }),
];
// -------------------------------------------------------------------------------
let common = {
  target: 'web',
  context: path.resolve(baseDir, 'app/src'),
  entry: {
    app: ['./index'],
  },
  output: {
    path: path.resolve(baseDir, 'dist'),
    publicPath: '/',
    filename: path.join('js', `[name].js?[fullhash:5]`),
  },
  resolve: {
    fallback: { fs: false }, // For antlr4!
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(baseDir, 'node_modules'), baseDir, path.resolve(baseDir, 'app/src')],
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },

  // stats: {
  //   colors: true,
  //   hash: true,
  //   version: true,
  //   timings: true,
  //   assets: true,
  //   chunks: true,
  //   modules: true,
  //   reasons: true,
  //   children: true,
  //   source: false,
  //   errors: true,
  //   errorDetails: false,
  //   warnings: true,
  //   publicPath: false,
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
      // CSS app/src ----------
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
      // Css ---- node_modules ------
      {
        test: /\.css$/,
        include: [path.resolve(baseDir, 'node_modules')],
        exclude: [
          path.join(baseDir, 'node_modules', 'antd'),
          // path.join(baseDir, 'node_modules', '@ant-design'),
        ],
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
      // Less --- antd ---
      {
        test: /\.less$/,
        include: [
          path.resolve(baseDir, 'node_modules', 'antd'),
          // path.resolve(baseDir, 'node_modules', '@ant-design'),
        ],
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
              modifyVars: merge(getThemeVariables({ dark: true, compact: true }), antdLessVars),
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
  optimization,
  plugins,
  performance,
};
// -------------------------------------------------------------------------------

// -------------------------------------------------------------------------------
module.exports = (env, argv) => {
  // Get Mode
  const mode = argv.mode === 'production' ? 'production' : 'development';
  const isProd = mode === 'production';
  if (isProd) {
    console.log(`\x1b[36m 🙇🏼‍ 🙇🏼  Is production mode [${VersionBuild}] \x1b[0m`);
    common = merge(common, {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ parallel: 8 })],
      },
    });
  } else {
    console.log(`\x1b[33m 🧘🏻‍️   🧘🏻   🧘🏻‍️ Is development mode [${VersionBuild}] \x1b[0m`);
    common = merge(common, {
      // devtool: 'eval-cheap-source-map',
      devtool: 'source-map',
      devServer,
    });
  }
  const result = merge(common, { mode });
  // console.log(result);
  return result;
};

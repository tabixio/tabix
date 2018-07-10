const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'development';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const analyzeBundle = false;

const isDevelopment = NODE_ENV === 'development';
const isStage = process.env.TYPE === 'stage';

const checkDir = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const build = async () => {
    //create folders
    [
        'public',
        'public/assets',
        'public/assets/js',
        'public/assets/css'
    ].forEach(folder => checkDir(path.resolve(__dirname, folder)));

    const version = require('./package.json').version;

    ['public/assets/css', 'public/assets/js'].forEach(p => {
        fs.readdirSync(path.resolve(__dirname, p)).forEach(f => {
            if (f === '.gitkeep') return;
            fs.unlinkSync(`${p}/${f}`);
        });
    });

    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                DEV: isDevelopment,
                STAGE: isStage
            }
        }),
        !isDevelopment && new ExtractTextPlugin('/css/styles.[chunkhash].css'),
        isDevelopment && new webpack.NamedModulesPlugin(),
        analyzeBundle && new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template/template.html'
        })
    ].filter(x => x !== false);

    const minimizers = [
        !isDevelopment &&
            new UglifyJSPlugin({
                extractComments: {
                    filename: ''
                },
                uglifyOptions: {
                    compress: true
                }
            })
    ].filter(x => x !== false);

    const entry = ['@babel/polyfill', './src/index.jsx'];

    const lessLoader = !isDevelopment
        ? {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                publicPath: '/assets'
            })
        }
        : {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        };

    const splitChunks = {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]|[\\/]libs\/ramda[\\/]|Vendor[\\/]/,
                name: 'vendors',
                chunks: 'all'
            }
        }
    };

    return {
        entry,
        output: {
            path: path.resolve(__dirname, 'public', 'assets/'),
            publicPath: '/',
            filename: `js/bundle${isDevelopment ? '' : '.v.' + version}.js`,
            chunkFilename: 'js/[name].[chunkhash].js'
        },
        devtool: isDevelopment && 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src/'),
                path.resolve(__dirname, 'src/components/')
            ]
        },
        optimization: {
            minimize: true,
            minimizer: minimizers,
            splitChunks: !isDevelopment && splitChunks
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: ['babel-loader']
                },

                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                lessLoader,
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: 'file-loader?name=[path][name].[ext]'
                },
                {
                    test: /\.(png)?$/,
                    loader: 'file-loader?name=[path][name].[ext]'
                }
            ]
        },
        plugins: plugins
    };
};

module.exports = build();

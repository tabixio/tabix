const path = require('path');

module.exports = {
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '..', 'src/'),
            path.resolve(__dirname, '..', 'src/components/')
        ]
    },
    //devtool: 'source-map',
    devServer: {
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
                include: path.resolve(__dirname, '../src/styles/')
            },
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
    }
};

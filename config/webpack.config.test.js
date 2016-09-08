const CleanWebpackPlugin = require('clean-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: './specs.js',
    output: {
        path: './test',
        filename: 'test.bundle.js'
    },
    babel: {
        presets: ['es2015']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.sass$/,
                loaders: ['css', 'sass']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['test'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        })
    ],
    devtool: 'source-map'
};
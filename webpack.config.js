const HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let extender = require('./config/webpack/extender');

let baseConfig = {
    entry: './app/main.js',
    output: {
        path: './dist',
        filename: 'app.js'
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin('styles.css')
    ],
    devServer: {
        contentBase: './dist',
        inline: true
    }
};

module.exports = extender(baseConfig);
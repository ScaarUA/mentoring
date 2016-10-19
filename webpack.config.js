require('dotenv').config();
const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let extender = require('./config/webpack/extender');
const devServer = require('./config/webpack/webpack.dev-server');
let baseConfig = {
    entry: ['webpack-dev-server/client', 'webpack/hot/dev-server', './app/main.js', './app/ui-components/index.scss'],
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
        new webpack.HotModuleReplacementPlugin(),
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
    devServer: devServer
};

module.exports = extender(baseConfig);
require('dotenv').config();
const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let extender = require('./config/webpack/extender');
const devServer = require('./config/webpack/webpack.dev-server');
let baseConfig = {
    entry: {
        app: './app/main.ts',
        vendor: './app/vendor.ts',
        polyfills: './app/polyfills.ts'
    },
    output: {
        path: './public',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    babel: {
        presets: ['es2015']
    },
    module: {
        preLoaders: [
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=styles/[name].woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=styles/[name].woff2'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=styles/[name].ttf'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=styles/[name].eot'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=styles/[name].svg'
            }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['assets']
        }),
        new ExtractTextPlugin('styles.css')
    ],
    devServer: devServer
};

module.exports = extender(baseConfig);
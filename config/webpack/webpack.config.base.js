const
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    devServer = require('./webpack.dev-server');

module.exports = {
    output: {
        path: './public',
        filename: '[name].js'
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
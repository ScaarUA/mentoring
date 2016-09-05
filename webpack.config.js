const webpack = require('webpack'),
      argv = require('yargs').argv;

let config = {
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
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            comments: false
        })
    ],
    devtool: 'source-map'
};

module.exports = config;
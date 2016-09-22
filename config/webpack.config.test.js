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
                test: /\.scss$/,
                loaders: ['css', 'sass']
            },
            {
                test: /sinon.js$/,
                loader: 'imports?define=>false'
            },
            {
                test: /\.spec\.js$/,
                loader: 'imports?chai,expect=>chai.expect,assert=>chai.assert,should=>chai.should()'
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
    devtool: 'source-map',
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
};
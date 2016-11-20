const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.ts',
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    babel: {
        presets: ['es2015']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
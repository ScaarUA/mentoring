const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  {
    entry: {
        app: './src/react/main.js'
    },
    loaders: [
        {
            test: /\.js$/,
            loader: ['react-hot', 'jsx', 'babel'],
            exclude: /node_modules/
        }
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/react/index.html'
        })
    ]
};
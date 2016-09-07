const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style', 'css?-minimize&sourceMap!autoprefixer?browsers=last 2 versions!sass?indentedSyntax&sourceMap')
            }
        ]
    },
    devtool: 'source-map'
};
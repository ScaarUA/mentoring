const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?-minimize&sourceMap!autoprefixer?browsers=last 2 versions!sass?&sourceMap')
            }
        ]
    },
    devtool: 'source-map'
};
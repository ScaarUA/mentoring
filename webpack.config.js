require('dotenv').config();
const
    merge = require('webpack-merge'),
    extender = require('./config/webpack/extender'),
    baseConfig = require('./config/webpack/webpack.config.base'),
    angularConfig = require('./config/webpack/webpack.config.angular'),
    reactConfig = require('./config/webpack/webpack.config.react'),
    reactBHConfig = require('./config/webpack/webpack.config.react-bh');

const framework = process.env.framework.trim();
let resultConfig = {};

if (framework === 'angular2') {
    resultConfig = merge(baseConfig, angularConfig);
}

if (framework === 'react') {
    resultConfig = merge(baseConfig, reactConfig);
}

if (framework === 'react-bh') {
    resultConfig = merge(baseConfig, reactBHConfig);
}

module.exports = extender(resultConfig);
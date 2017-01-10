require('dotenv').config();
const
    merge = require('webpack-merge'),
    extender = require('./config/webpack/extender'),
    baseConfig = require('./config/webpack/webpack.config.base'),
    angularConfig = require('./config/webpack/webpack.config.angular'),
    reactConfig = require('./config/webpack/webpack.config.react'),
    reactBHConfig = require('./config/webpack/webpack.config.react-bh'),
    d3BHConfig = require('./config/webpack/webpack.config.d3-bh');

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

if (framework === 'd3-bh') {
    resultConfig = merge(baseConfig, d3BHConfig);
}

module.exports = extender(resultConfig);
let webpackConfig = require('./webpack.config');

module.exports = (config) => {
    config.set({
        basePath: 'app',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            {pattern: '**/app.component.spec.js', watched: false}
        ],
        preprocessors: {
            'components/app.component.spec.js': ['webpack']
        },
        webpack: webpackConfig,
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-webpack',
            'karma-phantomjs2-launcher'
        ],
        browsers: ['PhantomJS2'],
        singleRun: true
    });
};
module.exports = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    contentBase: '/app',
    host: process.env.webpackServerHost,
    port: process.env.webpackServerPort,
    // quiet: false,
    proxy: [
        {
            path: '/api',
            target: {
                host: process.env.webpackServerHost,
                port: process.env.PORT
            }
        },
        {
            path: '/assets',
            target: {
                host: process.env.webpackServerHost,
                port: process.env.PORT
            }
        },
        {
            path: '/auth',
            target: {
                host: process.env.webpackServerHost,
                port: process.env.PORT
            }
        },
    ]
};
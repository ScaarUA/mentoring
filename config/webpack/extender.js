const argv = require('yargs').argv;

let modeConfig = argv.debug ? require('./devConfig') : require('./prodConfig');

module.exports = (config) => {
    for(var key in modeConfig) {
        if(modeConfig.hasOwnProperty(key) ) {
            let value = modeConfig[key];
            if(/(string)|(number)/.test((typeof value))) {
                config[key] = modeConfig[key];
            }
        }
    }

    if(modeConfig.module.loaders) {
        modeConfig.module.loaders.forEach((loader) => {
            config.module.loaders.push(loader);
        });
    }

    if(!config.plugins) {
        config.plugins = [];
    }
    if(modeConfig.plugins) {
        modeConfig.plugins.forEach((plugin) => {
            config.plugins.push(plugin);
        });
    }

    return config;
};
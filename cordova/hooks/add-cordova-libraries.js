const fs = require('fs-extra'),
    path = require('path');

const cordovaRoot = path.resolve(__dirname, '../'),
    toReplace = '<!--cordova-libraries-->',
    replacer = '<script src="cordova.js"></script><script src="cordova_plugins.js"></script>';

let indexHtml = fs.readFileSync(path.join(cordovaRoot, 'www/index.html'), 'utf8');

let newIndexHtml = indexHtml.replace(toReplace, replacer);

fs.writeFileSync(path.join(cordovaRoot, 'www/index.html'), newIndexHtml);
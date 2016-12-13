const fs = require('fs-extra'),
    path = require('path');

const cordovaRoot = path.resolve(__dirname, '../');

fs.copy(path.join(cordovaRoot, 'res'), path.join(cordovaRoot, 'platforms/android/res'));
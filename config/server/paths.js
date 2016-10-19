const path = require('path');

let corePath = path.resolve(__dirname, '../../app');

module.exports = {
    core: corePath,
    frontEnd: corePath,
    destinationStorageFile: path.resolve(__dirname, '../../uploads')
};
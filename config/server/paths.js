const path = require('path');

let corePath = path.resolve(__dirname, '../../dist');

module.exports = {
    core: corePath,
    frontEnd: corePath,
    destinationStorageFile: path.resolve(__dirname, '../../uploads')
};
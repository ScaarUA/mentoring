const path = require('path');

let corePath = path.resolve(__dirname, '../../public');

module.exports = {
    core: corePath,
    frontEnd: corePath,
    destinationStorageFile: path.resolve(__dirname, '../../uploads')
};
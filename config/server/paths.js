const path = require('path');

let corePath = path.resolve(__dirname, '../../mock_ui');

module.exports = {
    core: corePath,
    frontEnd: corePath,
    destinationStorageFile: path.resolve(__dirname, '../../uploads')
};
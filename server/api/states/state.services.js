
const fsp = require('fs-promise');
const paths = require('../../../config/server/paths');
const stateQueries = require('./state.queries');

module.exports = {
    generateState,
    removeFile,
    getPathFile
};

function generateState(data, file) {
    const state = {};

    if (data) {
        Object.assign(state, data);
    }

    if (file) {
        Object.assign(state, {
            image: {
                name: file.originalname,
                uploadName: file.filename
            }
        });
    }

    return state;
}

function removeFile(id) {
    return stateQueries.getState(id)
        .then((state) => {
            return fsp.remove(getPathFile(state));
        });
}

function getPathFile(state) {
    const uploadName = state.toObject().image.uploadName;

    return `${paths.destinationStorageFile}\\${uploadName}`;
}
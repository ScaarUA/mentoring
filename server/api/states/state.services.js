const fsp = require('fs-promise'),
    paths = require('../../../config/server/paths'),
    stateQueries = require('./state.queries'),
    path = require('path'),
    cloudinary = require('cloudinary');

module.exports = {
    uploadToCloud,
    removeFile,
    generateState,
    getPathFile,
    isModeCloudStorage
};

function uploadToCloud(req) {
    const localPath = getPathFile(req.file);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(localPath, (result) => {
            if (result.error) {
                reject({ message: `cloud error: ${result.error}` });
                return;
            }
            return removeFileLocal(localPath)
                .then(() => {
                    const state = generateState(req.body, result);

                    resolve(state);
                });
        });
    });
}


function generateState(data, file) {
    const state = {};

    if (data) {
        Object.assign(state, data);
    }

    if (file) {
        Object.assign(state, {
            image: {
                onCloud: !!file.public_id,
                name: file.originalname,
                path: file.url || getPathFile(file),
                public_id: file.public_id
            }
        });
    }

    return state;
}

function removeFile(id) {
    return stateQueries.getState(id)
        .then((state) => {
            if (state.image && state.image.onCloud) {
                return removeFileCloud(state.image.public_id);
            }
            return removeFileLocal(state.image.path);
        });
}

function removeFileLocal(path) {
    return fsp.remove(path);
}

function removeFileCloud(publicId) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (data) => {
            if (data.result === 'ok') {
                resolve({ message: 'success remove image from cloud' });
                return;
            }
            reject({ message: `cloud error: ${data.result}` });
        });
    });
}

function getPathFile(file) {
    return path.resolve(paths.destinationStorageFile, file.filename);
}

function isModeCloudStorage(req) {
    return req.body && req.body.onCloud === 'true';
}
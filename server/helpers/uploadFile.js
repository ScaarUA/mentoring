const fs = require('fs'),
    multer = require('multer'),
    paths = require('../../config/server/paths'),
    config = require('../../config/server/multer'),
    destinationStorage = paths.destinationStorageFile,
    ApiError = require('./ApiError');


const storage = multer.diskStorage({
    destination,
    filename
});

function destination(req, file, cb) {
    if (!fs.existsSync(destinationStorage)) {
        fs.mkdirSync(destinationStorage);
    }
    cb(null, destinationStorage);
}

function filename(req, file, cb) {
    const isModeCloudStorage = req.body && req.body.onCloud === 'true';
    const fileName = isModeCloudStorage ? file.originalname : `${Date.now()}_${file.originalname}`;

    cb(null, fileName);
}

function fileFilter(req, file, cb) {
    if (config.mimetypes.indexOf(file.mimetype) > -1) {
        cb(null, true);
    } else {
        cb(new ApiError('unexpected extension file', 400), false);
    }
}

module.exports = multer({
    storage,
    fileFilter,
    limits: config.limits
}).single(config.fieldNameInForm);


const paths = require('../../config/server/paths'),
    config = require('../../config/server/multer'),
    fs = require('fs'),
    destination = paths.destinationStorageFile,
    multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const isModeCloudStorage = req.body && req.body.onCloud === 'true';
        const fileName = isModeCloudStorage ? file.originalname : `${Date.now()}_${file.originalname}`;

        cb(null, fileName);
    }
});

function fileFilter(req, file, cb) {
    if (config.mimetypes.indexOf(file.mimetype) > -1) {
        cb(null, true);
    } else {
        cb('unexpected extension file', false);
    }
}

module.exports = multer({
    storage,
    fileFilter: fileFilter,
    limits: config.limits
}).single(config.fieldNameInForm);


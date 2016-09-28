const paths = require('../../config/server/paths');
const fieldNameInForm = 'file';
const multer = require('multer');

module.exports = multer({ dest: paths.destinationStorageFile }).single(fieldNameInForm);
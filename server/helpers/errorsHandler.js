const logger = require('./logger');

module.exports = function (error, req, res, next) {  // eslint-disable-line
    logger.error(error.stack);
    return res.status(error && error.status || 500).send({
        status: 'failed',
        message: error && error.message
    });
};
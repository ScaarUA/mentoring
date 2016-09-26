const logger = require('./logger');

module.exports = function (error, req, res) {
    logger.error(error);
    return res.status(500).send({
        error: error.toString()
    });
};
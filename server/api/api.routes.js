const express = require('express'),
    router = express.Router();

router.use('/projects', require('./projects'));
router.use('/flows', require('./flows'));

module.exports = router;
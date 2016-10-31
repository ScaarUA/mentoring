const express = require('express'),
    router = express.Router();

// router.use(require('../helpers/auth.interceptor'));
router.use('/projects', require('./projects'));
router.use('/flows', require('./flows'));
router.use('/states', require('./states'));
router.use('/users', require('./users'));

module.exports = router;
const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use('/projects', require('./projects/project.routes'));

module.exports = router;
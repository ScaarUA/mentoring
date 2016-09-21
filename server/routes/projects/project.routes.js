const express = require('express'),
    router = express.Router(),
    controllers = require('./project.controllers');

router.get('/', controllers.getAllProjects);
router.get('/:id', controllers.getProjectById);

module.exports = router;
const express = require('express'),
    router = express.Router(),
    controllers = require('./project.controllers.js');

router.route('/')
    .get(controllers.getAll)
    .post(controllers.create);

router.route('/:id')
    .get(controllers.getProject)
    .put(controllers.update)
    .delete(controllers.remove);

module.exports = router;
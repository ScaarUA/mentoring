const express = require('express'),
    router = express.Router(),
    ProjectControllers = require('./project.controllers'),
    controllers = new ProjectControllers();

router.route('/')
    .get(controllers.getAll.bind(controllers))
    .post(controllers.create.bind(controllers));

router.route('/:id')
    .get(controllers.getOne.bind(controllers))
    .put(controllers.update.bind(controllers))
    .delete(controllers.remove.bind(controllers));

module.exports = router;
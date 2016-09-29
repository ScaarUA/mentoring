const express = require('express'),
    router = express.Router(),
    StateControllers = require('./state.controllers.js'),
    controllers = new StateControllers();

router.route('/')
    .get(controllers.getAll.bind(controllers))
    .post(controllers.create.bind(controllers));

router.route('/:id')
    .get(controllers.getOne.bind(controllers))
    .put(controllers.update.bind(controllers))
    .delete(controllers.remove.bind(controllers));

router.route('/:id/image')
    .get(controllers.download.bind(controllers));

module.exports = router;
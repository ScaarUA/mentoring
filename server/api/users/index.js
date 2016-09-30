const express = require('express'),
    router = express.Router(),
    UserControllers = require('./user.controllers'),
    controllers = new UserControllers();

router.route('/')
    .get(controllers.getAll.bind(controllers));

router.route('/:id')
    .get(controllers.getOne.bind(controllers))
    .delete(controllers.remove.bind(controllers))
    .put(controllers.update.bind(controllers));

module.exports = router;
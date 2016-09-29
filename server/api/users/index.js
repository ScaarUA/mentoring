const express = require('express'),
    router = express.Router(),
    controllers = require('./user.controllers.js');

router.route('/')
    .get(controllers.getAll);

router.route('/:id')
    .get(controllers.getUser)
    .put(controllers.update);

module.exports = router;
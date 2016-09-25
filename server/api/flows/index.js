const express = require('express'),
    router = express.Router(),
    controllers = require('./flow.controllers.js');

router.route('/')
    .get(controllers.getAll)
    .post(controllers.create);

router.route('/:id')
    .get(controllers.getFlow)
    .put(controllers.update)
    .delete(controllers.remove);

module.exports = router;
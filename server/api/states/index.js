const express = require('express'),
    router = express.Router(),
    controllers = require('./state.controllers.js');

router.route('/')
    .get(controllers.getAll)
    .post(controllers.create);

router.route('/:id')
    .get(controllers.getState)
    .put(controllers.update)
    .delete(controllers.remove);

router.route('/:id/image')
    .get(controllers.download);

module.exports = router;
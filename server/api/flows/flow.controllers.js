const Flow = require('./flow.model'),
    flowQueries = require('./flow.queries'),
    BaseControllers = require('../../helpers/base.controllers.js');

class FlowControllers extends BaseControllers {
    constructor() {
        super(Flow);
    }

    getOne(req, res, next) {
        let id = req.params.id;

        flowQueries.getOne(id)
            .then(flow => {
                return res.send(flow);
            })
            .catch(next);
    }

    getAll(req, res, next) {
        return flowQueries.getAll()
            .then((states) => {
                return res.status(200).send(states);
            })
            .catch(next);
    }
}

module.exports = FlowControllers;
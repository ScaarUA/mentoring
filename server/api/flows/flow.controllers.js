const Flow = require('./flow.model'),
    BaseControllers = require('../../helpers/base.controllers.js');

class FlowControllers extends BaseControllers {
    constructor() {
        super(Flow);
    }
}

module.exports = FlowControllers;
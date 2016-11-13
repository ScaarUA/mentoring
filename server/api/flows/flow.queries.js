const Flow = require('./flow.model');

module.exports = {
    getFlow,
    getAll
};

function getFlow(id) {
    return Flow.findById(id).deepPopulate('state');
}

function getAll() {
    return Flow.find().deepPopulate('state');
}
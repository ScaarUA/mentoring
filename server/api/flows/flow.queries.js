const Flow = require('./flow.model');

module.exports = {
    getAll,
    getFlow,
    create,
    update,
    remove
};

function getAll() {
    return Flow.find({}).exec();
}

function getFlow(id) {
    return Flow.findById(id);
}

function create(flow) {
    return Flow.create(flow);
}

function update(id, data) {
    return Flow.findById(id)
        .then((flow) => {
            const updatedInstance = Object.assign(flow, data);
            return updatedInstance.save();
        });
}

function remove(id) {
    return Flow.remove({ _id: id });
}
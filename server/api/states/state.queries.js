const State = require('./state.model');

module.exports = {
    getState,
    create,
    update,
    remove
};

function getState(id) {
    return State.findById(id);
}

function create(state) {
    return State.create(state);
}

function update(id, data) {
    return State.findById(id)
        .then((state) => {
            const updatedInstance = Object.assign(state, data);

            return updatedInstance.save();
        });
}

function remove(id) {
    return State.remove({ _id: id });
}
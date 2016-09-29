const User = require('./user.model');

module.exports = {
    getAll,
    getuser,
    update
};

function getAll() {
    return User.find();
}

function getuser(id) {
    return User.findById(id);
}

function update(id, data) {
    return User.findById(id)
        .then((user) => {
            const updatedInstance = Object.assign(user, data);

            return updatedInstance.save();
        });
}
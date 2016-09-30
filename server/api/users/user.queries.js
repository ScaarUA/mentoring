const User = require('./user.model');

module.exports = {
    update
};



function update(id, data) {
    return User.findById(id)
        .then((user) => {
            const updatedInstance = Object.assign(user, data);

            return updatedInstance.save();
        });
}
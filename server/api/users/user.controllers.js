const userQueries = require('./user.queries');

module.exports = {
    getAll,
    getUser,
    update
};

function getAll(req, res, next) {
    return userQueries.getAll()
        .then((users) => {
            return res.status(200).send(users);
        })
        .catch(next);
}

function getUser(req, res, next) {
    const id = req.params.id;

    return userQueries.getuser(id)
        .then((user) => {
            return res.status(200).send(user);
        })
        .catch(next);
}

function update(req, res, next) {
    const id = req.params.id;
    const data = req.body;

    return userQueries.update(id, data)
        .then((user) => {
            return res.status(200).send(user);
        })
        .catch(next);
}
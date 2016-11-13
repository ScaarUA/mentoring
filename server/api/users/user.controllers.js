const User = require('./user.model'),
    userQueries = require('./user.queries'),
    BaseControllers = require('../../helpers/base.controllers.js');

class UserControllers extends BaseControllers {
    constructor() {
        super(User);
    }

    update(req, res, next) {
        const id = req.params.id;
        const data = {
            local: req.body
        };

        return userQueries.update(id, data)
            .then((user) => {
                return res.status(200).send(user);
            })
            .catch(next);
    }

    getCurrent(req, res) {
        if (req.user) {
            let user = {
                id: req.user._id,
                name: req.user.local.name || req.user.google.name,
                email: req.user.local.email || req.user.google.email
            };

            res.send(user);
        } else {
            res.sendStatus(401);
        }
    }
}

module.exports = UserControllers;
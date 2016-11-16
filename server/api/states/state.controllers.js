const
    State = require('./state.model'),
    stateQueries = require('./state.queries'),
    stateServices = require('./state.services'),
    BaseControllers = require('../../helpers/base.controllers.js');

class StateControllers extends BaseControllers {
    constructor() {
        super(State);
    }

    create(req, res, next) {
        return new Promise((resolve) => {
            if (stateServices.isModeCloudStorage(req)) {
                resolve(stateServices.uploadToCloud(req));
                return;
            }
            resolve(stateServices.generateState(req.body, req.file));
        }).then((state) => {
            return stateQueries.create(state)
                .then((state) => {
                    return res.status(200).send(state);
                });
        }).catch(next);
    }

    update(req, res, next) {
        const id = req.params.id;

        return new Promise((resolve) => {
            if (req.file) {
                return stateServices.removeFile(id)
                    .then(() => {
                        if (stateServices.isModeCloudStorage(req)) {
                            resolve(stateServices.uploadToCloud(req));
                            return;
                        }
                        resolve(stateServices.generateState(req.body, req.file));
                    });
            }
        }).then((state) => {
            stateQueries.update(id, state)
                .then((state) => {
                    return res.status(200).send(state);
                });
        }).catch(next);
    }

    remove(req, res, next) {
        const id = req.params.id;

        stateServices.removeFile(id)
            .then(() => {
                return stateQueries.remove(id);
            })
            .then((state) => {
                return res.status(200).send(state);
            })
            .catch(next);
    }

    download(req, res, next) {
        const id = req.params.id;

        return stateQueries.getState(id)
            .then((state) => {
                return res.status(200).download(state.image.path, state.image.name);
            })
            .catch(next);
    }

}

module.exports = StateControllers;
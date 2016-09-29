const State = require('./state.model'),
    stateQueries = require('./state.queries'),
    stateServices = require('./state.services'),
    uploader = require('../../helpers/uploadFile'),
    BaseControllers = require('../../helpers/base.controllers.js');

class StateControllers extends BaseControllers {
    constructor() {
        super(State);
    }

    create(req, res, next) {
        uploader(req, res, (err) => {
            if (err) next(err);
            const state = stateServices.generateState(req.body, req.file);

            return stateQueries.create(state)
                .then((state) => {
                    return res.status(200).send(state);
                })
                .catch(next);
        });
    }

    update(req, res, next) {
        uploader(req, res, (err) => {
            if (err) next(err);
            const id = req.params.id;
            const state = stateServices.generateState(req.body, req.file);

            if (req.file) {
                return stateServices.removeFile(id)
                    .then(() => {
                        return stateQueries.update(id, state);
                    })
                    .then((state) => {
                        return res.status(200).send(state);
                    })
                    .catch(next);
            }
            return stateQueries.update(id, state)
                .then((state) => {
                    return res.status(200).send(state);
                })
                .catch(next);

        });
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
                return res.status(200).download(stateServices.getPathFile(state), state.image.name);
            })
            .catch(next);
    }

}

module.exports = StateControllers;
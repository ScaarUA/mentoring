const stateQueries = require('./state.queries');
const stateServices = require('./state.services');
const uploader = require('../../helpers/uploadFile');

module.exports = {
    getAll,
    getState,
    update,
    create,
    remove,
    download
};

function getAll(req, res, next) {
    return stateQueries.getAll()
        .then((states) => {
            return res.status(200).send(states);
        })
        .catch(next);
}

function getState(req, res, next) {
    const id = req.params.id;

    return stateQueries.getState(id)
        .then((state) => {
            return res.status(200).send(state);
        })
        .catch(next);
}

function create(req, res, next) {
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

function update(req, res, next) {
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

function remove(req, res, next) {
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

function download(req, res, next) {
    const id = req.params.id;

    return stateQueries.getState(id)
        .then((state) => {
            return res.status(200).download(stateServices.getPathFile(state), state.image.name);
        })
        .catch(next);
}
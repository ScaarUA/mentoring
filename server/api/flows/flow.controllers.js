const logger = require('../../helpers/logger');
const flowQueries = require('./flow.queries');

module.exports = {
    getAll,
    getFlow,
    update,
    create,
    remove
};

function getAll() {
    return flowQueries.getAll()
        .then((flows) => {
            return res.status(200).send(flows);
        })
        .catch((err) => {
            logger.error(err);
            return res.status(403).send(err);
        });
}

function getFlow(req, res) {
    const id = req.params.id;
    return flowQueries.getFlow(id)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch((err) => {
            logger.error(err);
            return res.status(403).send(err);
        });
}

function create(req, res) {
    const flow = req.body;
    return flowQueries.create(flow)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch((err) => {
            logger.error(err);
            return res.status(403).send(err);
        });
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    return flowQueries.update(id, data)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch((err) => {
            logger.error(err);
            return res.status(403).send(err);
        });
}

function remove(req, res) {
    const id = req.params.id;
    return flowQueries.remove(id)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch((err) => {
            logger.error(err);
            return res.status(403).send(err);
        });
}
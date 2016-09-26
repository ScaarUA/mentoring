const flowQueries = require('./flow.queries');

module.exports = {
    getAll,
    getFlow,
    update,
    create,
    remove
};

function getAll(req, res, next) {
    return flowQueries.getAll()
        .then((flows) => {
            return res.status(200).send(flows);
        })
        .catch(next);
}

function getFlow(req, res, next) {
    const id = req.params.id;
    return flowQueries.getFlow(id)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch(next);
}

function create(req, res, next) {
    const flow = req.body;
    return flowQueries.create(flow)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch(next);
}

function update(req, res, next) {
    const id = req.params.id;
    const data = req.body;
    return flowQueries.update(id, data)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch(next);
}

function remove(req, res, next) {
    const id = req.params.id;
    return flowQueries.remove(id)
        .then((flow) => {
            return res.status(200).send(flow);
        })
        .catch(next);
}
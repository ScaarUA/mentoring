const projectQueries = require('./project.queries');

module.exports = {
    getAll: getAll,
    getProject: getProject,
    create: create,
    update: update,
    remove: remove
};

function getAll(req, res, next) {
    projectQueries.getAll()
        .then(projects => {
            return res.send(projects);
        })
        .catch(next);
}

function getProject(req, res, next) {
    let id = req.body.id;

    projectQueries.getProject(id)
        .then(project => {
            return res.send(project);
        })
        .catch(next);
}

function create(req, res, next) {
    let project = req.body;

    projectQueries.create(project)
        .then(project => {
            res.status(200).send(project);
        })
        .catch(next);
}

function update(req, res, next) {
    let id = req.params.id,
        data = req.body;

    return projectQueries.update(id, data)
        .then((project) => {
            return res.status(200).send(project);
        })
        .catch(next);
}

function remove(req, res, next) {
    let id = req.params.id;

    return projectQueries.remove(id)
        .then((project) => {
            return res.status(200).send(project);
        })
        .catch(next);
}
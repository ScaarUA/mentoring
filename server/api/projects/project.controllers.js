const Project = require('./project.model'),
    projectQueries = require('./project.queries'),
    BaseControllers = require('../../helpers/base.controllers.js');

class ProjectControllers extends BaseControllers {
    constructor() {
        super(Project);
    }

    getOne(req, res, next) {
        let id = req.body.id;

        projectQueries.getOne(id)
            .then(project => {
                return res.send(project);
            })
            .catch(next);
    }
}

module.exports = ProjectControllers;
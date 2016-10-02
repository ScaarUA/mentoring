const Project = require('./project.model'),
    projectQueries = require('./project.queries'),
    BaseControllers = require('../../helpers/base.controllers.js');

class ProjectControllers extends BaseControllers {
    constructor() {
        super(Project);
    }

    getOne(req, res, next) {
        let id = req.params.id;

        projectQueries.getOne(id)
            .then(project => {
                return res.send(project);
            })
            .catch(next);
    }

    update(req, res, next) {
        const id = req.params.id;
        const data = req.body;

        return projectQueries.getOne(id)
            .then((project) => {
                let existing = {
                    flows: getOnlyIds(project.flows),
                    editors: getOnlyIds(project.editors),
                    readers: getOnlyIds(project.readers)
                };

                Object.keys(data).forEach(key => {
                    if (typeof data[key] !== 'object') {
                        project[key] = data[key];
                    } else {
                        data[key].forEach(item => {
                            if (!~existing[key].indexOf(item)) {
                                project[key].push(item);
                            }
                        });
                    }
                });

                return project.save();
            })
            .then((project) => {
                return res.status(200).send(project);
            })
            .catch(next);
    }

    getAccessedProjects(req, res, next) {
        let userId = req.user._id,
            type = req.params.type,
            accessedTypes = ['editors', 'readers'];

        if (!~accessedTypes.indexOf(type)) {
            return res.sendStatus(412);
        }

        projectQueries.getAccessedProjects(type, userId)
            .then(projects => {
                return res.send(projects);
            })
            .catch(next);
    }
}

function getOnlyIds(array) {
    return array.map(item => item._id + '');
}

module.exports = ProjectControllers;
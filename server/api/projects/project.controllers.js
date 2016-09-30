const Project = require('./project.model'),
    BaseControllers = require('../../helpers/base.controllers.js');

class ProjectControllers extends BaseControllers {
    constructor() {
        super(Project);
    }
}

module.exports = ProjectControllers;
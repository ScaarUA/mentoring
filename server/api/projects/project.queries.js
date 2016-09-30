const Project = require('./project.model');

module.exports = {
    getOne: getOne
};

function getOne(id) {
    return Project.findById(id).deepPopulate(['readers', 'editors', 'flows']);
}
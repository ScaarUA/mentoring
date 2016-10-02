const Project = require('./project.model'),
    mongoose = require('mongoose');

module.exports = {
    getOne: getOne,
    getAccessedProjects: getAccessedProjects
};

function getOne(id) {
    return Project.findById(id).deepPopulate(['readers', 'editors', 'flows']);
}

function getAccessedProjects(type, usersId) {
    let condition = {};

    condition[type] = mongoose.Types.ObjectId(usersId);
    return Project.find(condition);
}
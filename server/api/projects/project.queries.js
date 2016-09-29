const Project = require('./project.model');

module.exports = {
    getAll: getAll,
    getProject: getProject,
    create: create,
    update: update,
    remove: remove
};

function getAll() {
    return Project.find();
}

function getProject(id) {
    return Project.findById(id).deepPopulate(['readers', 'editors', 'flows', 'flows.state']);
}

function create(project) {
    return Project.create(project);
}

function update(id, data) {
    return Project.findById(id)
        .then((flow) => {
            const updatedInstance = Object.assign(flow, data);
            
            return updatedInstance.save();
        });
}

function remove(id) {
    return Project.remove({ _id: id });
}
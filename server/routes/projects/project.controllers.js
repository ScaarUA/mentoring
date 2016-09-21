const Project = require('../../models/Project'),
    logger = require('../../helpers/logger');

module.exports = {
    getAllProjects: getAllProjects,
    getProjectById: getProjectById
};

function getAllProjects(req, res) {
    Project.find({}, (err, projects) => {
        if(err) {
            logger.error(err);
            return res.sendStatus(503);
        }
        return res.send(projects);
    });
}

function getProjectById() {

}
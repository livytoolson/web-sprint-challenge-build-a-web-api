const Project = require('../projects/projects-model');

const validateProjectId = (req, res, next) => {
    const { id } = req.params
    Project.get(id)
    .then(project => {
        if (project) {
            req.project = project
            next();
        } else {
            res.status(404).json({ message: `Project with the id of ${id} does not exist.` })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error retrieving the action.' })
    })
};

const validateProject = (req, res, next) => {
    const name = req.body.name
    const description = req.body.description
    if (!name) {
      res.status(400).json({ message: 'Missing description.' })
    } else if (!description) {
      res.status(400).json({ message: 'Missing notes.' })
    } else {
      next();
    }
  };

module.exports = {
    validateProjectId,
    validateProject
}
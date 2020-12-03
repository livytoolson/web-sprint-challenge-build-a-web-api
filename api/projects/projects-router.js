// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');

const router = express.Router();

const validateId = (req, res, next) => {
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

router.get('/', (_, res) => {
    Project.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'The project information could not be retrieved.' })
    })
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
});

router.get('/:id/actions', validateId, (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'The actions associated with this project could not be retrieved.' })
    })
})

router.post('/', validateProject, (req, res) => {
    const projectBody = req.body
    Project.insert(projectBody)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error adding the project.' })
    })
});

router.put('/:id', validateProject, validateId, (req, res) => {
    const { id } = req.params
    const change = req.body
    Project.update(id, change)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error updating the project.' })
    })
});

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params
    Project.remove(id)
    .then(() => {
        res.status(200).json({ message: 'The project has been deleted.' })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error removing the project.' })
    })
});

module.exports = router;
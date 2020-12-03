// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');
const middlewares = require('../middlewares/projects-middlewares');

const router = express.Router();

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

router.get('/:id', middlewares.validateProjectId, (req, res) => {
    res.status(200).json(req.project)
});

router.get('/:id/actions', middlewares.validateProjectId, (req, res) => {
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

router.post('/', middlewares.validateProject, (req, res) => {
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

router.put('/:id', middlewares.validateProject, middlewares.validateProjectId, (req, res) => {
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

router.delete('/:id', middlewares.validateProjectId, (req, res) => {
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
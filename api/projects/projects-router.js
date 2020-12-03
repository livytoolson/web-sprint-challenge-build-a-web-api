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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {

});

router.delete('/:id', validateId, (req, res) => {

});

module.exports = router;
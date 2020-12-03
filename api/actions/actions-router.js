const express = require('express');

const Action = require('./actions-model');
const middlewares = require('../middlewares/actions-middlewares');

const router = express.Router();

router.get('/', (_, res) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ messsage: 'The action informatoin could not be retrieved.' })
    })
});

router.get('/:id', middlewares.validateActionId, (req, res) => {
   res.status(200).json(req.action)
});

router.post('/', middlewares.validateAction, (req, res) => {
    const body = req.body
    Action.insert(body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error adding the action.' })
    })
});

router.put('/:id', middlewares.validateAction, middlewares.validateActionId, (req, res) => {
    const { id } = req.params
    const changes = req.body
    Action.update(id, changes)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error updating the action.' })
    })
});

router.delete('/:id', middlewares.validateActionId, (req, res) => {
    const { id } = req.params
    Action.remove(id)
    .then(() => {
        res.status(200).json({ message: 'The action has been deleted.' })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error removing the action.' })
    })
});

module.exports = router;
// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model');

const router = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params
    Action.get(id)
    .then(action => {
        if (action) {
            req.action = action
            next();
        } else {
            res.status(404).json({ message: `Action with id of ${id} does not exist.` })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error retrieving the action.' })
    })
}

const validateAction = (req, res, next) => {
    const description = req.body.description
    const notes = req.body.notes
    if (!description) {
      res.status(400).json({ message: 'Missing description.' })
    } else if (!notes) {
      res.status(400).json({ message: 'Missing notes.' })
    } else {
      next();
    }
  };

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

router.get('/:id', validateId, (req, res) => {
   res.status(200).json(req.action)
});

router.post('/', validateAction, (req, res) => {
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

router.put('/:id', validateAction, validateId, (req, res) => {
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

router.delete('/:id', validateId, (req, res) => {
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
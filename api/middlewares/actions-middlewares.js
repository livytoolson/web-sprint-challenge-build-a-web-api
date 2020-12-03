const Action = require('../actions/actions-model');

const validateActionId = (req, res, next) => {
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

  module.exports = {
      validateActionId,
      validateAction
  }
const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agentController');

//Add a new agency
router.post('/', agentController.create);

//Get all agents in database
router.get('/', agentController.getAll);

//Get agent by id
router.get('/:id_agent', agentController.findById);

//Get agent by agency
router.get('/agency/:id_agency', agentController.findByAgency);

//Update agent by id
router.put('/:id_agent', agentController.update);

//Delete agent by id
router.delete('/:id_agent', agentController.delete);

module.exports = router;
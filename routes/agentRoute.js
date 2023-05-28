const express = require('express');
const router = express.Router();
const jwtservice = require('../services/jwt-service');

const agentController = require('../controllers/agentController');

//Add a new agency
router.post('/', jwtservice.requireAdmin, agentController.create);

//Get all agents in database
router.get('/', agentController.getAll);

//Get agent by id
router.get('/:id_agent', agentController.findById);

//Get agent by agency
router.get('/agency/:id_agency', agentController.findByAgency);

//Update agent by id
router.put('/:id_agent', jwtservice.requireAdmin, agentController.update);

//Delete agent by id
router.delete('/:id_agent', jwtservice.requireAdmin, agentController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const jwtservice = require('../services/jwt-service');

const agencyController = require('../controllers/agencyController');

//Add a new agency
router.post('/', agencyController.create);

//Get all agencies in database
router.get('/', agencyController.getAll);

//Get agency by id
router.get('/:id_agency', agencyController.findById);

//Update agency by id
router.put('/:id_agency', jwtservice.requireAdmin, agencyController.update);

//Delete agency by id
router.delete('/:id_agency', jwtservice.requireAdmin, agencyController.delete);

module.exports = router;
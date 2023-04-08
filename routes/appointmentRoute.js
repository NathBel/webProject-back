const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

//Add a new appointment
router.post('/', appointmentController.create);

//Get all appointments in database
router.get('/', appointmentController.getAll);

//Get appointment by id
router.get('/:id_appointment', appointmentController.findById);

//Get appointment by user
router.get('/user/:id_user', appointmentController.findByUser);

//Get appointment by agent
router.get('/agent/:id_agent', appointmentController.findByAgent);

//Update appointment by id
router.put('/:id_appointment', appointmentController.update);

//Delete appointment by id
router.delete('/:id_appointment', appointmentController.delete);

module.exports = router;
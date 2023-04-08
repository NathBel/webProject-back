const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//Add a new user
router.post('/', userController.create);

//Get all users in database
router.get('/', userController.getAll);

//Get user by id
router.get('/:id_user', userController.findById);

//Get user by email
router.get('/email/:userEmail', userController.findByEmail);

//Update user by id
router.put('/:id_user', userController.update);

//Delete user by id
router.delete('/:id_user', userController.delete);

module.exports = router;
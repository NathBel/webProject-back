const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtservice = require('../services/jwt-service');

//Add a new user
router.post('/register', userController.create);

//login a user
router.post('/login', userController.login);

//Get all users in database
router.get('/', userController.getAll);

//Get user by id
router.get('/:id_user', userController.findById);

//Get user by email
router.get('/email/:email', userController.findByEmail);

//Update user by id
router.put('/:id_user', userController.updateById);

//Delete user by id
router.delete('/:id_user', userController.delete);

module.exports = router;
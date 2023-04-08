const express = require('express');
const router = express.Router();

const likesController = require('../controllers/likesController');

//Add a new like
router.post('/', likesController.create);

//Get all likes of a user
router.get('/user/:id_user', likesController.getAllByIdUser);

//Delete a like by id
router.delete('/:id_user/:id_housing', likesController.remove);

module.exports = router;
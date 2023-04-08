const Likes = require("../models/likesModel.js");

// Create and Save a new Likes
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    // Create a Likes
    const likes = new Likes({
        id_user: req.body.id_user,
        id_housing: req.body.id_housing,
    });
    
    // Save Likes in the database
    Likes.create(likes, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Likes."
        });
        else res.send(data);
    });
};

// Retrieve all Likes by user from the database.
exports.getAllByIdUser = (req, res) => {
    Likes.getAllByIdUser(req.params.id_user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Likes with user_id ${req.params.id_user} and housing_id ${req.params.id_housing}. `
                });
            } else {
                res.status(500).send({
                message: `Could not delete Likes with id user_id ${req.params.id_user} and housing_id ${req.params.id_housing}. `
                });
            }
            } else res.send(data);
        });
};

// Delete a Likes with the specified id in the request
exports.remove = (req, res) => {
    Likes.remove(req.params.id_user, req.params.id_housing, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Likes with user_id ${req.params.id_user} and housing_id ${req.params.id_housing}. `
            });
        } else {
            res.status(500).send({
            message: `Could not delete Likes with id user_id ${req.params.id_user} and housing_id ${req.params.id_housing}. `
            });
        }
        } else res.send({ message: `Likes was deleted successfully!` });
    });
};


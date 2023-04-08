const User = require('../models/userModel.js');

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile_phone: req.body.mobile_phone,
        address: req.body.address,
        city: req.body.city,
        zip_code: req.body.zip_code,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Users from the database.
exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single User with a id_user
exports.findById = (req, res) => {
    User.findById(req.params.id_user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id_user}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id_user
                });
            }
        } else res.send(data);
    });
};

// Find a single User with a email
exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.userEmail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userEmail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userEmail
                });
            }
        } else res.send(data);
    });
};

// Update a User identified by the id_user in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.id_user,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id_user}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id_user
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified id_user in the request
exports.delete = (req, res) => {
    User.remove(req.params.id_user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id_user}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id_user
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};
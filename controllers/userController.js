const User = require('../models/userModel.js');
const hash = require("../services/hashPassword-service.js");
const jwt = require("../services/jwt-service.js");

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
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err) {
            if (err.kind === "email_cannot_be_null") {
                res.status(404).send({
                    message: `email format is not valid.`
                });
            } else {
                res.status(500).send({
                    message: "Some error occurred while creating the User."
                });
            }
        }
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

//Find user by email
exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with email ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with email " + req.params.email
                });
            }
        } else res.send(data);
    });
};

// login a single User with a userEmail and password
exports.login = (req, res) => {
    User.login(req.body.userEmail, async (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with email ${req.params.userEmail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userEmail
                });
            }
        } else {
            if(hash.comparePassword(hash.decryptPassword(req.body.password), data.password)) {
                const token = await jwt.generateToken(data.id_user, data.isAdmin, data.firstname, data.lastname, data.email);
                res.json({ 'token': token });
            } 
            else {
                res.status(500).send({
                    message: "password incorrect"
                });
            }  
        };
    });
};

// Update a User identified by the id_user in the request
exports.updateById = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.id_user,
        req.body,
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
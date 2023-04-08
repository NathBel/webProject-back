const Agency = require("../models/agencyModel.js");

// Create and Save a new Agency
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    // Create a Agency
    const agency = new Agency({
        address: req.body.address,
        city: req.body.city,
        zip_code: req.body.zip_code,
        phone: req.body.phone,
    });
    
    // Save Agency in the database
    Agency.create(agency, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Agency."
        });
        else res.send(data);
    });
};

// Retrieve all Agencies from the database.
exports.getAll = (req, res) => {
    Agency.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving agencies."
        });
        else res.send(data);
    });
};

// Find a single Agency with a id_agency
exports.findById = (req, res) => {
    Agency.findById(req.params.id_agency, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Agency with id ${req.params.id_agency}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Agency with id " + req.params.id_agency
            });
        }
        } else res.send(data);
    });
};

// Update a Agency identified by the id_agency in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    Agency.updateById(
        req.params.id_agency,
        new Agency(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Agency with id ${req.params.id_agency}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Agency with id " + req.params.id_agency
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Agency with the specified id_agency in the request
exports.delete = (req, res) => {
    Agency.remove(req.params.id_agency, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Agency with id ${req.params.id_agency}.`
            });
        } else {
            res.status(500).send({
            message: "Could not delete Agency with id " + req.params.id_agency
            });
        }
        } else res.send({ message: `Agency was deleted successfully!` });
    });
};


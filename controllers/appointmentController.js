const Appointment = require("../models/appointmentModel.js");

// Create and Save a new Appointment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    // Create a Appointment
    const appointment = new Appointment({
        date: req.body.date,
        time: req.body.time,
        id_user: req.body.id_user,
        id_housing: req.body.id_housing,
        id_agent: req.body.id_agent,
    });
    
    // Save Appointment in the database
    Appointment.create(appointment, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Appointment."
        });
        else res.send(data);
    });
};

// Retrieve all Appointments from the database.
exports.getAll = (req, res) => {
    Appointment.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving appointments."
        });
        else res.send(data);
    });
};

// Find a single Appointment with a id_appointment
exports.findById = (req, res) => {
    Appointment.findById(req.params.id_appointment, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Appointment with id ${req.params.id_appointment}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Appointment with id " + req.params.id_appointment
            });
        }
        } else res.send(data);
    });
};

// Find all appointments for a specific user
exports.findByUser = (req, res) => {
    Appointment.findByIdUser(req.params.id_user, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Appointment with user ${req.params.id_user}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Appointment with user " + req.params.id_user
            });
        }
        } else res.send(data);
    });
};

// Find all appointments for a specific agent
exports.findByAgent = (req, res) => {
    Appointment.findByIdAgent(req.params.id_agent, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Appointment with agent ${req.params.id_agent}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Appointment with agent " + req.params.id_agent
            });
        }
        } else res.send(data);
    });
};

// Update a Appointment identified by the id_appointment in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    Appointment.updateById(
        req.params.id_appointment,
        new Appointment(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Appointment with id ${req.params.id_appointment}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Appointment with id " + req.params.id_appointment
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Appointment with the specified id_appointment in the request
exports.delete = (req, res) => {
    Appointment.remove(req.params.id_appointment, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Appointment with id ${req.params.id_appointment}.`
            });
        } else {
            res.status(500).send({
            message: "Could not delete Appointment with id " + req.params.id_appointment
            });
        }
        } else res.send({ message: `Appointment was deleted successfully!` });
    });
};
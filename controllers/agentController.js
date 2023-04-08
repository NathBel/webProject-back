const Agent = require("../models/agentModel.js");

// Create and Save a new Agent
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    // Create a Agent
    const agent = new Agent({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        id_agency: req.body.id_agency
    });
    
    // Save Agent in the database
    Agent.create(agent, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Agent."
        });
        else res.send(data);
    });
};

// Retrieve all Agents from the database.
exports.getAll = (req, res) => {
    Agent.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving agents."
        });
        else res.send(data);
    });
};

// Find a single Agent with a id_agent
exports.findById = (req, res) => {
    Agent.findById(req.params.id_agent, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Agent with id ${req.params.id_agent}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Agent with id " + req.params.id_agent
            });
        }
        } else res.send(data);
    });
};

//Find all agents working in a specific agency
exports.findByAgency = (req, res) => {
    Agent.findByAgency(req.params.id_agency, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Agent working in this agency ${req.params.id_agency}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Agent with id " + req.params.id_agency
            });
        }
        } else res.send(data);
    });
};

// Update a Agent identified by the id_agent in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    Agent.updateById(
        req.params.id_agent,
        new Agent(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Agent with id ${req.params.id_agent}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Agent with id " + req.params.id_agent
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Agent with the specified id_agent in the request
exports.delete = (req, res) => {
    Agent.remove(req.params.id_agent, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Agent with id ${req.params.id_agent}.`
            });
        } else {
            res.status(500).send({
            message: "Could not delete Agent with id " + req.params.id_agent
            });
        }
        } else res.send({ message: `Agent was deleted successfully!` });
    });
};
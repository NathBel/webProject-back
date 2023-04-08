const Photos = require("../models/photosModel.js");

// Create and Save a new Photos
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    // Create a Photos
    const photos = new Photos({
        photo: req.file.filename,
        id_housing: req.body.id_housing,
    });
    
    // Save Photos in the database
    Photos.create(photos, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Photos."
        });
        else res.send(data);
    });
};

// Retrieve all Photos by housing from the database.
exports.getAllByIdHousing = (req, res) => {
    Photos.getAllByIdHousing(req.params.id_housing, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Photos with housing_id ${req.params.id_housing}. `
                });
            } else {
                res.status(500).send({
                message: `Could not delete Photos with id housing_id ${req.params.id_housing}. `
                });
            }
            } else res.send(data);
        });
};

// Delete a Photos with the specified id in the request
exports.remove = (req, res) => {
    Photos.remove(req.params.id_photos, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Photos with id ${req.params.id_photos}. `
            });
        } else {
            res.status(500).send({
            message: `Could not delete Photos with id  ${req.params.id_photos}. `
            });
        }
        } else res.send({ message: `Photos was deleted successfully!` });
    });
};

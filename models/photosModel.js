const sql = require("../db.js");

// Constructor
const Photos = function(photos) {
    this.photo = photos.photo;
    this.id_housing = photos.id_housing;
};

// Create and Save a new Photos
Photos.create = (newPhotos, result) => {
    sql.query("INSERT INTO photos SET ?", newPhotos, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created photos: ", {...newPhotos });
        result(null, {...newPhotos });
    });
};

// Retrieve all Photos by housing
Photos.getAllByIdHousing = (idHousing, result) => {
    sql.query(`SELECT * FROM photos WHERE id_housing = ${idHousing}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length == 0) {
            // not found Appointment with the id
            result({ kind: "not_found" }, null);
        } else {
            result(null, res);
            return;
        }
    });
};

// Delete a Photos with the specified id in the request
Photos.remove = (idPhotos, result) => {
    sql.query("DELETE FROM photos WHERE id_photos = ?", idPhotos, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Photos with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted photos with id: ", idPhotos);
        result(null, res);
    });
};

module.exports = Photos;
const sql = require("../db.js");

// Constructor
const Likes = function(likes) {
    this.id_user = likes.id_user;
    this.id_housing = likes.id_housing;
    };

// Create and Save a new Likes
Likes.create = (newLikes, result) => {
    sql.query("INSERT INTO likes SET ?", newLikes, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created likes: ", {...newLikes });
        result(null, {...newLikes });
    });
};

// Retrieve all Likes by user
Likes.getAllByIdUser = (idUser, result) => {
    sql.query(`SELECT * FROM likes WHERE id_user = ${idUser}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length == 0) {
            // not found Appointment with the id
            result({ kind: "not_found" }, null);
        } else {
            console.log("likes: ", res);
            result(null, res);
            return;
        }
    });
};

// Delete a Likes with the specified id in the request
Likes.remove = (idUser, idHousing, result) => {
    sql.query("DELETE FROM likes WHERE id_user = ? AND id_housing = ?", [idUser, idHousing], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Likes with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted likes with id user and housing: ", idUser, idHousing);
        result(null, res);
    });
};

module.exports = Likes;
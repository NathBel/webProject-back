const sql = require("../db.js");

// Constructor
const User = function(user){
    this.id_user = user.id_user;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.mobile_phone = user.mobile_phone;
    this.address = user.address;
    this.city = user.city;
    this.zip_code = user.zip_code;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
}

// Add  user in the database
User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id_user: res.insertId, ...newUser });
        result(null, { id_user: res.insertId, ...newUser });
    });
};

//Get all users in database
User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  };

//Get user by id
User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id_user = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

//Get user by email
User.findByEmail = (userEmail, result) => {
    sql.query(`SELECT * FROM user WHERE email = '${userEmail}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the email
        result({ kind: "not_found" }, null);
    });
};

//Update user by id
User.updateById = (id, user, result) => {
    sql.query("UPDATE user SET firstname = ?, lastname = ?, mobile_phone = ?, address = ?, city = ?, zip_code = ?, email = ?, password = ?, isAdmin = ? WHERE id_user = ?", [user.firstname, user.lastname, user.mobile_phone, user.address, user.city, user.zip_code, user.email, user.password, user.isAdmin, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
    });
};

//Delete user by id
User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id_user = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};




module.exports = User;
const sql = require("../db.js");
const validator = require("../services/validator-service.js");
const hash = require("../services/hashPassword-service.js");

// Constructor

const User = function(user){
    this.id_user = user.id_user;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.mobile_phone = user.mobile_phone;
    this.address = user.address;
    this.city = user.city;
    this.zip_code = user.zip_code;
    //Check if email is valid
    if(validator.validateEmail(user.email)){
        this.email = user.email;
    } else {
        console.log("Invalid email");
    }
    // Hash password
    this.password = hash.hashPassword(10, hash.decryptPassword(user.password));
    this.isAdmin = user.isAdmin;
}

// Add  user in the database
User.create = (newUser, result) => {
    if (newUser.email == undefined){
        result({ kind: "email_cannot_be_null" }, null);
    }
    else{
        console.log(newUser);
        sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            
            console.log("created user: ", { id_user: res.insertId, ...newUser });
            result(null, { id_user: res.insertId, ...newUser });
        });
    }
};

//Get all users in database
User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
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
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

//Get user by email
User.findByEmail = (userEmail, result) => {
    sql.query(`SELECT * FROM user WHERE email = '${userEmail}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found User with the email
        result({ kind: "not_found" }, null);
    });
};

//Login user
User.login = (userEmail, result) => {
    sql.query(`SELECT * FROM user WHERE email = '${userEmail}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found User with the email
        result({ kind: "not_found" }, null);
    });
};

//Update user by id
User.updateById = (id, user, result) => {
    sql.query("UPDATE user SET firstname = ?, lastname = ?, mobile_phone = ?, address = ?, city = ?, zip_code = ?, email = ? WHERE id_user = ?", [user.firstname, user.lastname, user.mobile_phone, user.address, user.city, user.zip_code, user.email, id], (err, res) => {
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
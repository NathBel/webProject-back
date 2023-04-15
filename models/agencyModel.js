const sql = require("../db.js");

// Constructor
const Agency = function(agency){
    this.address = agency.address;
    this.city = agency.city;
    this.zip_code = agency.zip_code;
    this.phone = agency.phone;
}

// Add  agency in the database
Agency.create = (newAgency, result) => {
    sql.query("INSERT INTO real_estate_agency SET ?", newAgency, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created agency: ", { id_agency: res.insertId, ...newAgency });
        result(null, { id_agency: res.insertId, ...newAgency });
    });
};

//Get all agencies in database
Agency.getAll = result => {
    sql.query("SELECT * FROM real_estate_agency", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

//Get agency by id
Agency.findById = (agencyId, result) => {
    sql.query(`SELECT * FROM real_estate_agency WHERE id_agency = ${agencyId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found agency with the id
        result({ kind: "not_found" }, null);
    });
};


//Update agency by id
Agency.updateById = (id, agency, result) => {
    sql.query("UPDATE real_estate_agency SET address = ?, city = ?, zip_code = ?, phone = ? WHERE id_agency = ?", [agency.address, agency.city, agency.zip_code, agency.phone, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Agency with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id, ...agency });
    });
};

//Delete agency by id
Agency.remove = (id, result) => {
    sql.query("DELETE FROM real_estate_agency WHERE id_agency = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Agency with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted agency with id: ", id);
        result(null, res);
    });
};




module.exports = Agency;
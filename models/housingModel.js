const sql = require("../db.js");

// Constructor
const Housing = function(housing) {
  this.id_housing = housing.id_housing;
  this.price = housing.price;
  this.address = housing.address;
  this.city = housing.city;
  this.zip_code = housing.zip_code;
  this.global_surface = housing.global_surface;
  this.living_surface = housing.living_surface;
  this.description = housing.description;
  this.number_room = housing.number_room;
  this.energy_performance = housing.energy_performance;
  this.type = housing.type;
};

// Add  housing in the database
Housing.create = (newHousing, result) => {
  sql.query("INSERT INTO housing SET ?", newHousing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created housing: ", { id_housing: res.insertId, ...newHousing });
    result(null, { id_housing: res.insertId, ...newHousing });
  });
};


// Get all housing in the database
Housing.getAll = result => {
  sql.query("SELECT * FROM housing", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Get housing by id
Housing.getHousingById = (id_housing, result) => {
  sql.query("SELECT * FROM housing WHERE id_housing = ?",id_housing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Housing with the id
    result({ kind: "not_found" }, null);
  });
};

// Get housing by type
Housing.getHousingByType = (type_housing, result) => {
  sql.query("SELECT * FROM housing WHERE type = ?",type_housing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 0) {
      // not found Housing with the type
      result({ kind: "not_found" }, null);
    }
    else {
      result(null, res);
    }
  });
};

// Get housing by city
Housing.getHousingByCity = (city, result) => {
  sql.query("SELECT * FROM housing WHERE city = ?",city, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 0) {
      // not found Housing with the city
      result({ kind: "not_found" }, null);
    }
    else {
      result(null, res);
    }
  });
};

// Get housing by zip_code
Housing.getHousingByZipCode = (zip_code, result) => {
  sql.query("SELECT * FROM housing WHERE zip_code = ?",zip_code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 0) {
      // not found Housing with the zip_code
      result({ kind: "not_found" }, null);
    }
    else {
      result(null, res);
    }
  });
};

// Get housing by min and max price
Housing.getHousingByPrice = (min_price, max_price, result) => {
  sql.query("SELECT * FROM housing WHERE price > ? and price < ?",[min_price, max_price], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 0) {
      // not found Housing with this price range
      result({ kind: "not_found" }, null);
    }
    else {
      result(null, res);
    }
  });
};

// Get housing by min and max living surface
Housing.getHousingByLivingSurface = (min_surface, max_surface, result) => {
  sql.query("SELECT * FROM housing WHERE living_surface > ? and living_surface < ?",[min_surface, max_surface], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 0) {
      // not found Housing with this surface range
      result({ kind: "not_found" }, null);
    }
    else {
      result(null, res);
    }
  });
};

//Update a housing identified by the housingId in the request
Housing.updateById = (id, housing, result) => {
  sql.query(
    "UPDATE housing SET price = ?, address = ?, city = ?, zip_code = ?, global_surface = ?, living_surface = ?, description = ?, number_room = ?, energy_performance = ?, type = ? WHERE id_housing = ?",
    [housing.price, housing.address, housing.city, housing.zip_code, housing.global_surface, housing.living_surface, housing.description, housing.number_room, housing.energy_performance, housing.type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Housing with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...housing });
    }
  );
};

//Delete a housing with the specified housingId in the request
Housing.remove = (id, result) => {
  sql.query("DELETE FROM housing WHERE id_housing = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Housing with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted housing with id: ", id);
    result(null, res);
  });
};

module.exports = Housing;
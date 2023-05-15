const Housing = require('../models/housingModel.js');

// Create and Save a new Housing
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    // Create a Housing
    const housing = new Housing({
        type: req.body.type,
        price: req.body.price,
        address: req.body.address,
        city: req.body.city,
        zip_code: req.body.zip_code,
        global_surface: req.body.global_surface,
        living_surface: req.body.living_surface,
        description: req.body.description,
        number_room: req.body.number_room,
        energy_performance: req.body.energy_performance,
        location: req.body.location,
        sale: req.body.sale,
    });

    // Save Housing in the database
    Housing.create(housing, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Housing."
            });
        else res.send(data);
    });
}

//Get all housing information
exports.getAll = (req, res) => {
    Housing.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving housings."
        });
      else res.send(data);
    });
};

//Get housing by id
exports.getHousingById = (req, res) => {
  Housing.getHousingById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Some error occurred while retrieving Housing with id " + req.params.id
          });
        }
      } 
    else res.send(data);
  });
};

//Get housing by type
exports.getHousingByType = (req, res) => {
  Housing.getHousingByType(req.params.type, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with type ${req.params.type}.`
          });
        } else {
          res.status(500).send({
            message: "Some error occurred while retrieving Housing with type " + req.params.type
          });
        }
      } 
    else res.send(data);
  });
};

//Get city
exports.getCity = (req, res) => {
  Housing.getCity(req.params.startCity, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Housing with city ${req.params.city}.`
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with city " + req.params.city
        });
      }
    } 
    else res.send(data);
    });
};

//Get housing by city
exports.getHousingByCity = (req, res) => {
  Housing.getHousingByCity(req.params.city, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with city ${req.params.city}.`
          });
        } else {
          res.status(500).send({
            message: "Some error occurred while retrieving Housing with city " + req.params.city
          });
        }
      } 
    else res.send(data);
  });
};

//Get housing by zip_code
exports.getHousingByZipCode = (req, res) => {
  Housing.getHousingByZipCode(req.params.zip_code, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with zip_code ${req.params.zip_code}.`
          });
        } else {
          res.status(500).send({
            message: "Some error occurred while retrieving Housing with zip_code " + req.params.zip_code
          });
        }
      } 
    else res.send(data);
  });
};

//Get max price
exports.getMaxPrice = (req, res) => {
  Housing.getMaxPrice((err, data) => { 
    if (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with max price."
        });
      }
    else res.send(data);
  });
};

//Get min price
exports.getMinPrice = (req, res) => {
  Housing.getMinPrice((err, data) => { 
    if (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with min price."
        });
      }
    else res.send(data);
  });
};


//Get housing by min and max price
exports.getHousingByPrice = (req, res) => {
  Housing.getHousingByPrice(req.params.min_price, req.params.max_price, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with this range of price :  ${req.params.min_price} - ${req.params.max_price}.`
          });
        } else {
          res.status(500).send({
            message: `Some error occurred while retrieving Housing with this range of price :  ${req.params.min_price} - ${req.params.max_price}.`
          });
        }
      } 
    else res.send(data);
  });
};

//Get max global surface
exports.getMaxGlobalSurface = (req, res) => {
  Housing.getMaxGlobalSurface((err, data) => {
    if (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with max global surface."
        });
      }
    else res.send(data);
  });
};

//Get min global surface
exports.getMinGlobalSurface = (req, res) => {
  Housing.getMinGlobalSurface((err, data) => {
    if (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with min global surface."
        });
      }
    else res.send(data);
  });
};

//Get housing by min and max global surface
exports.getHousingByGlobalSurface = (req, res) => {
  Housing.getHousingByGlobalSurface(req.params.min_global_surface, req.params.max_global_surface, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with this range of global surface :  ${req.params.min_surface} - ${req.params.max_surface}.`
          });
        } else {
          res.status(500).send({
            message: `Some error occurred while retrieving Housing with this range of global surface :  ${req.params.min_surface} - ${req.params.max_surface}.`
          });
        }
      }
    else res.send(data);
  });
};

//Get max living surface
exports.getMaxLivingSurface = (req, res) => {
  Housing.getMaxLivingSurface((err, data) => {
    if (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with max living surface."
        });
      }
    else res.send(data);
  });
};

//Get min living surface
exports.getMinLivingSurface = (req, res) => {
  Housing.getMinLivingSurface((err, data) => {
    if (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving Housing with min living surface."
        });
      }
    else res.send(data);
  });
};

//Get housing by min and max living surface
exports.getHousingByLivingSurface = (req, res) => {
  Housing.getHousingByLivingSurface(req.params.min_surface, req.params.max_surface, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with this range of surface :  ${req.params.min_surface} - ${req.params.max_surface}.`
          });
        } else {
          res.status(500).send({
            message: `Some error occurred while retrieving Housing with this range of surface :  ${req.params.min_surface} - ${req.params.max_surface}.`
          });
        }
      } 
    else res.send(data);
  });
};

//Get housing in rent
exports.getHousingInRent = (req, res) => {
  Housing.getHousingInRent((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing in rent.`
          });
        } else {
          res.status(500).send({
            message: `Some error occurred while retrieving Housing in rent.`
          });
        }
      }
    else res.send(data);
  });
};

//Get housing in sale
exports.getHousingInSale = (req, res) => {
  Housing.getHousingInSale((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing in sale.`
          });
        } else {
          res.status(500).send({
            message: `Some error occurred while retrieving Housing in sale.`
          });
        }
      }
    else res.send(data);
  });
};

//Get housing from research
exports.getHousingFromResearch = (req, res) => {
  Housing.getHousingFromResearch(req.params.city, req.params.max_price, req.params.min_price, req.params.max_global_surface, req.params.min_global_surface, req.params.max_living_surface, req.params.min_living_surface, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with this research :  ${req.params.research}.`
          });
        } else {
          res.status(500).send({
            message: `Some error occurred while retrieving Housing with this research :  ${req.params.research}.`
          });
        }
      }
    else res.send(data);
  });
};

//Update a housing identified by id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Housing.updateById(
      req.params.id,
      new Housing(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Housing with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Housing with id " + req.params.id
            });
          }
        } 
        else res.send(data);
      }
    );
  };

// Delete a Housing with id 
exports.delete = (req, res) => {
    Housing.remove(req.params.id, (err) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Housing with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Housing with id " + req.params.id
          });
        }
      } else res.send({ message: `Housing was deleted successfully!` });
    });
  };
const express = require('express');
const router = express.Router();

const housingController = require('../controllers/housingController');

//Get all housing information
router.get('/', housingController.getAll);

//Get housing information by id
router.get('/:id', housingController.getHousingById);

//Get housing information by type
router.get('/type/:type', housingController.getHousingByType);

//Get housing information by city
router.get('/city/:city', housingController.getHousingByCity);

//Get housing information by zip code
router.get('/zip_code/:zip_code', housingController.getHousingByZipCode);

//Get housing information by price
router.get('/price/:min_price/:max_price', housingController.getHousingByPrice);

//Get housing information by surface
router.get('/surface/:min_surface/:max_surface', housingController.getHousingByLivingSurface);

//Add a new housing
router.post('/', housingController.create);

//Update housing from id
router.put('/:id', housingController.update);

//Delete housing from id
router.delete('/:id', housingController.delete);



module.exports = router;
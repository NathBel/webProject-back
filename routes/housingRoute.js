const express = require('express');
const router = express.Router();

const housingController = require('../controllers/housingController');

//Get all housing information
router.get('/', housingController.getAll);

//Get housing information by id
router.get('/id/:id', housingController.getHousingById);

//Get housing information by type
router.get('/type/:type', housingController.getHousingByType);

//Get city
router.get('/startCity/:startCity', housingController.getCity);

//Get housing information by city
router.get('/city/:city', housingController.getHousingByCity);

//Get housing information by zip code
router.get('/zip_code/:zip_code', housingController.getHousingByZipCode);

//Get max price
router.get('/max_price', housingController.getMaxPrice);

//Get min price
router.get('/min_price', housingController.getMinPrice);

//Get housing information by price
router.get('/price/:min_price/:max_price', housingController.getHousingByPrice);

//Get max global surface
router.get('/max_global_surface', housingController.getMaxGlobalSurface);

//Get min global surface
router.get('/min_global_surface', housingController.getMinGlobalSurface);

//Get housing information by global surface
router.get('/global_surface/:min_global_surface/:max_global_surface', housingController.getHousingByGlobalSurface);

//Get max surface
router.get('/max_surface', housingController.getMaxLivingSurface);

//Get min surface
router.get('/min_surface', housingController.getMinLivingSurface);

//Get housing information by living surface
router.get('/surface/:min_surface/:max_surface', housingController.getHousingByLivingSurface);

//Get housing in rent
router.get('/rent', housingController.getHousingInRent);

//Get housing in sale
router.get('/sale', housingController.getHousingInSale);

//Get housing from research
router.get('/research/:city/:max_price/:min_price/:max_global_surface/:min_global_surface/:max_living_surface/:min_living_surface', housingController.getHousingFromResearch);

//Add a new housing
router.post('/', housingController.create);

//Update housing from id
router.put('/:id', housingController.update);

//Delete housing from id
router.delete('/:id', housingController.delete);



module.exports = router;
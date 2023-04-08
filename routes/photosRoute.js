const express = require('express');
const router = express.Router();

const photosController = require('../controllers/photosController');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination:'./assets/photos/',
  filename:(req,file,callback)=>{
    return callback(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
  }
});
const upload = multer({storage: storage});

//Add a new photo
router.post('/', upload.single('photo') ,photosController.create);

//Get all photos by housing
router.get('/housing/:id_housing', photosController.getAllByIdHousing);

//Delete photo by id
router.delete('/:id_photos', photosController.remove);

module.exports = router;
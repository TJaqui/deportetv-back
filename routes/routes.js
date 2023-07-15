const express = require("express");


const userController = require("../controllers/userController");
const sportController = require("../controllers/sportController")

const router = express.Router();




router.get('/users',userController.getAllusers);
router.get('/sports',sportController.getAllSports);
router.get('/users/username/:username',userController.getUserByUserName);

router.post('/registro',userController.Registro);
router.post('/registro-deporte',sportController.RegistroDeporte);
router.post('/autenticar',userController.autenticar);




module.exports = router;
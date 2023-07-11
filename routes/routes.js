const express = require("express");


const userController = require("../controllers/userController");

const router = express.Router();




router.get('/users',userController.getAllusers);
router.get('/users/username/:username',userController.getUserByUserName);

router.post('/registro',userController.Registro);
router.post('/autenticar',userController.autenticar);




module.exports = router;
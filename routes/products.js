const router = require("express").Router();
const productControler = require('../controlse/productsContoler.js');


router.get("/",productControler.getAllProducts);

module.exports = router;
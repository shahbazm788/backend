const router = require("express").Router();

const catController = require("./catagoy_controller.js");
router.get("/",catController.getAllCat);
router.post("/createcat",catController.createCat);
router.post("/getbycat",catController.getByCat);


module.exports = router;
const router = require("express").Router();
const reviewControler = require("./reviews_controlers.js");


router.post("/",reviewControler.getReview);
router.post("/add",reviewControler.add);

module.exports = router;
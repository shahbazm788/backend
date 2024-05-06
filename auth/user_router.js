const router = require("express").Router();

const userControler = require("./add_user_controler.js");
router.get("/",userControler.getUser);
router.post("/login",userControler.login);
router.post("/reguser",userControler.regUser);



module.exports = router;
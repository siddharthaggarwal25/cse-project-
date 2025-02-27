const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);



module.exports = router;

const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const isAuthenticated = require( "../middleware/userAuth");

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.post ( '/updateCredit' ,isAuthenticated ,  userControllers.updateCredit);

module.exports = router;

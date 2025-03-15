const express = require("express");
const router = express.Router();
const isAuthenticated = require( "../middleware/userAuth");
const adminControllers = require ( "../controllers/adminControllers");


router.post( "/admin/updateApproved" , adminControllers.updateApproved) 

module.exports = router;

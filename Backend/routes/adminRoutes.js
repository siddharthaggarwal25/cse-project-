const express = require("express");
const router = express.Router();
const isAuthenticated = require( "../middleware/userAuth");
const adminControllers = require ( "../controllers/adminControllers");


router.post( "/admin/updateApproved" , adminControllers.updateApproved) 
router.get('/admin/pendingQuestionPaper' , adminControllers.pendingQuestionPaper)
router.get('/admin/paper/:id' , adminControllers.reviewPaper);
module.exports = router;

const express = require("express");
const router = express.Router();
const questionPaperControllers = require("../controllers/questionPaperControllers");
const  isAuthenticated= require("../middleware/userAuth");

router.post("/upload", isAuthenticated , questionPaperControllers.upload);

module.exports = router;

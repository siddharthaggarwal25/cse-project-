const express = require("express");
const router = express.Router();
const questionPaperControllers = require("../controllers/questionPaperControllers");
const  isAuthenticated= require("../middleware/userAuth");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });



router.post("/upload", isAuthenticated ,upload.single('file') ,  questionPaperControllers.uploadQuestionPaper);
router.get("/credit", isAuthenticated , questionPaperControllers.changeCredit);

module.exports = router;

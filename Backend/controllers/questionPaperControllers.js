const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const User = require("../models/user");
const QuestionPaper = require("../models/questionpaper");

const uploadQuestionPaper = async (req, res, next) => {
  try {
    const Owner = req.userData.userId;
    const Title = req.body.topic;
    const UrlLink = req.file.path;
    const questionpaper = new QuestionPaper({
      Owner,
      Title,
      UrlLink,
    });
    await questionpaper.save();
    res.json({ message: "successfully uploaded" });
  } catch (error) {
    console.log(error);
    next(new HttpError("Upload  failed, try again later", 500));
  }
};


exports.uploadQuestionPaper = uploadQuestionPaper;

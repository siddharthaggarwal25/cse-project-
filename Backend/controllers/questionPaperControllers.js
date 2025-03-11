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
const changeCredit = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const user = await  User.findById(userId);

    if (!user) next(new HttpError("user not find   ", 403));

    user.Credits = user.Credits + 100;
    const savedUser = await user.save();
    res.json({ credit: savedUser.Credits });
  } catch (error) {
    console.log(error);
    next(new HttpError("error ocurued in credit chnage   ", 403));
  }
};

exports.uploadQuestionPaper = uploadQuestionPaper;
exports.changeCredit = changeCredit;

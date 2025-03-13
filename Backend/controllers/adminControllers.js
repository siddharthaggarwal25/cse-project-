const HttpError = require("../utils/HttpError");
const User = require("../models/user");
const QuestionPaper = require("../models/questionpaper");
const updateAproved = async (req, res, next) => {
  try {
    const aproved = req.body.aproved;
    if (!aproved) return next(new HttpError(" status not Found   ", 403));

    const questionPapersId = req.body.questionPapersId;
    if (!questionPapersId)
      return next(new HttpError(" question paer Id not Found   ", 403));

    const paper = await QuestionPaper.findById(questionPapersId);
    if (!paper) return next(new HttpError(" paperNotFound  ", 403));

    if (aproved == "true") {
      paper.IsApproved = true;
      const savedPaper = await paper.save();
      const user = await User.findById(savedPaper.Owner);
      user.Credit = user.Credit + 100;
      user.Notification.push(" Paper is accepted , 100 credit is added ");
      await user.save();

      res.json({
        message: "question paper is Successfuly approved ",
      });
    } else {
      const deletedPaper = await QuestionPaper.findByIdAndDelete(
        questionPapersId
      );
      const user = await User.findById(paper.Owner);
      user.Notification.push(" question paer not accepted");
      res.json({ message: " question paper not accepted" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateAproved = updateAproved;

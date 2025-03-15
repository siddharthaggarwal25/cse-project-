const HttpError = require("../utils/HttpError");
const User = require("../models/user");
const QuestionPaper = require("../models/questionpaper");

const updateApproved = async (req, res, next) => {
  try {
    const approved = req.body.approved;
    if (!approved) return next(new HttpError(" status not Found   ", 403));

    const questionPapersId = req.body.questionPapersId;
    if (!questionPapersId)
      return next(new HttpError(" question paper Id not Found   ", 403));

    const paper = await QuestionPaper.findById(questionPapersId);
    if (!paper) return next(new HttpError(" paperNotFound  ", 403));

    if (approved == "true") {
      paper.IsApproved = true;
      const savedPaper = await paper.save();
      const user = await User.findById(savedPaper.Owner);
      user.Credit = user.Credit + 100;
      user.Notification.push({
        Message: "Paper have been approved",
        Type: "Approval",
      });
      await user.save();
      console.log( "approved")
      res.json({
        message: "question paper is Successfuly approved ",
      });
    } else {
      await QuestionPaper.findByIdAndDelete(questionPapersId);
      const user = await User.findById(paper.Owner);
      user.Notification.push({
        Message: "Paper have not been approved",
        Type: "NotApproval",
      });
      await user.save();
      console.log( "notapproved");
      res.json({ message: " question paper not accepted" });
    }
  } catch (error) {
    console.log(error);
  }
};


const pendingQuestionPaper = async  (req , res , next)=>{
    try {
      const pendingPapers = await QuestionPaper.find( { IsApproved : false});
      if( !pendingPapers)return next( new HttpError( "error" , 403));
      console.log( pendingPapers);
      res.json ( pendingPapers);
    }catch( error){
      console.log( error);
      return next( new HttpError( " error occured" , 402))
    }
}

const reviewPaper = async( req , res , next)=>{
  try{
       const {id} = req.params;
       console.log( id);
       const paper = await QuestionPaper.findById(id);
       if( !paper) return  next( new HttpError( "question paper not exist" , 402));
        res.json( paper);
     }catch( error){
      console.log( error);
      return next( new HttpError( " error" , 403));
     }
}


exports.pendingQuestionPaper= pendingQuestionPaper
exports.updateApproved = updateApproved;
exports.reviewPaper= reviewPaper

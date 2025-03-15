const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const User = require("../models/user");
const QuestionPaper = require("../models/questionpaper");

const uploadQuestionPaper = async (req, res, next) => {
  try {
    const Owner = req.userData.userId;
    const Title = req.body.topic;
    const Subject = req.body.subject;
    const UrlLink = req.file.path;
    const questionpaper = new QuestionPaper({
      Owner,
      Title,
      Subject ,
      UrlLink,
    });
    await questionpaper.save();
    res.json({ message: "successfully uploaded" });
  } catch (error) {
    console.log(error);
    next(new HttpError("Upload  failed, try again later", 500));
  }
};


const questionPaper = async( req , res , next)=>{
  try{
       console.log( "question paper arriving ");
       const papers = await QuestionPaper.find({IsApproved : true});
       console.log( papers);
       if( !papers)return next ( new HttpError ( " Error occured in fetching " , 403 )) ;
       res.json ( papers);
  }catch( error){
    console.log( error);
  }
}


exports.uploadQuestionPaper = uploadQuestionPaper;
exports.questionPaper = questionPaper;

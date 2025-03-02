
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const User = require("../models/user");
const QuestionPaper  = require ( "../models/questionpaper");


const upload = async ( req, res, next) =>{
     let userId = req.userData.userId;
     res.send( "uploded ");
}

exports.upload = upload;
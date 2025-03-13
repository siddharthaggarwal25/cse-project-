const mongoose = require("mongoose");

const QuestionPaperSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Subject : {
      type : String ,
      required  : true 
  },
  UrlLink: {
    type: String,
    required: true,
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  IsApproved: {
    type: Boolean,
    default: false,
  }, 
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuestionPaper", QuestionPaperSchema);

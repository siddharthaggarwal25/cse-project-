const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const User = require("../models/User");

const signup = async (req, res, next) => {
  const { Name, Email, Password } = req.body;

  try {
    if (await User.findOne({ Email })) {
      return next(new HttpError("User already exists", 422));
    }

    const hashPassword = await bcrypt.hash(Password, 12);
    const newUser = await new User({
      Name,
      Email,
      Password: hashPassword,
    }).save();

    const token = jwt.sign({ userId: newUser._id }, "siddharth", {
      expiresIn: "1h",
    });

    console.log( newUser , token );

    res.status(201).json({ Token: token, UserId: newUser._id });
  } catch (error) {
    console.log( error);
    next(new HttpError("Signup failed, try again later", 500));
  }
};

const login = async (req, res, next) => {
 
   const { Email, Password } = req.body;
  
    try {
      const existingUser = await User.findOne({ Email });
      if (!existingUser || !(await bcrypt.compare(Password, existingUser.Password))) {
        return next(new HttpError("Invalid credentials", 403));
      }
  
      const token = jwt.sign({ UserId: existingUser._id }, "siddharth", { expiresIn: "1h" });
  
      res.json({ UserId: existingUser._id, Token: token });
    } catch (error) {
      next(new HttpError("Login failed, try again later.", 500));
    }
  };
  

exports.signup = signup;
exports.login = login;

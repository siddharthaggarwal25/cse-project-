const HttpError = require("../utils/HttpError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/user");

const makePayment = async (req, res, next) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return;
    }
    console.log ( order);
    res.json(order);
  } catch (err) {a
    return next(new HttpError("Error", 500));
  }
};

const validatePayment = async (req, res, next) => {
  console.log ( "-------------" , req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return next(new HttpError("Transaction failed ", 403));
    }
    const user = await User.findById(req.userData.userId);
    if (!user) return next(new HttpError("User not find ", 402));

     user.Credit = user.Credit + 10000;
    const savedUser = await user.save();
    console.log( savedUser);
    res.json({ credit: savedUser.Credit });
  } catch (error) {
    console.log(error);
    return next(new HttpError("error occured", 403));
  }

};

exports.makePayment = makePayment;
exports.validatePayment = validatePayment;

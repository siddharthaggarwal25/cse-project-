const express = require("express");
const router = express.Router();
const paymentControllers = require("../controllers/paymentControllers")
const isAuthenticated = require("../middleware/userAuth");

router.post( '/makePayment' , isAuthenticated , paymentControllers.makePayment);
router.post( '/validatePayment' , isAuthenticated , paymentControllers.validatePayment);

module.exports = router;

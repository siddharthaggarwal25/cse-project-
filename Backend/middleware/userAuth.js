const jwt = require('jsonwebtoken');
const HttpError =require('../utils/HttpError')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {

    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'siddharth');

    req.userData = { userId: decodedToken.userId };
    console.log( userData);
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};

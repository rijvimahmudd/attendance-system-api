const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'unauthorized',
      });
    }
    // eslint-disable-next-line prefer-destructuring
    token = token.split(' ')[1];
    const decode = jwt.verify(token, 'sec-key');
    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(401).json({
        message: 'unauthorized',
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authenticate;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByProperty, createNewUser } = require('./user');
const error = require('../util/error');

const registerService = async ({
  email, password, name, accountStatus, roles,
}) => {
  const user = await findUserByProperty('email', email);
  if (user) {
    throw error('User already exist', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({
    name, email, password: hash, roles, accountStatus,
  });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty('email', email);
  if (!user) {
    throw error('Invalid credentials', 400);
  }
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    throw error('Invalid credentials', 400);
  }

  // eslint-disable-next-line no-underscore-dangle
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, 'sec-key', {
    algorithm: 'HS256',
  });
};

module.exports = {
  registerService,
  loginService,
};

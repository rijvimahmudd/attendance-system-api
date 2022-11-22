const { registerService } = require('../service/auth');
const userService = require('../service/user');
const error = require('../util/error');

const getUser = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('user not found', 404);
    }

    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};

const postUser = async (req, res, next) => {
  const {
    name, email, password, roles, accountStatus,
  } = req.body;

  console.log(accountStatus);
  try {
    const user = await registerService({
      name, email, password, roles, accountStatus,
    });
    return res.status(201).json(user);
  } catch (e) {
    return next(e);
  }
};

const putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const {
    name, roles, accountStatus, email,
  } = req.body;
  try {
    const user = await userService.updateUser(userId, {
      name, roles, accountStatus, email,
    });
    if (!user) {
      throw error('User not found', 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User not found', 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User not found', 404);
    }
    await user.remove();

    return res.status(203).send();
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getUser, getUserById, postUser, putUserById, patchUserById, deleteUserById,
};

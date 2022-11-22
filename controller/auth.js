const { loginService, registerService } = require('../service/auth');

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }
  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json({
      message: 'User create successfully',
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }
  try {
    const token = await loginService({ email, password });
    return res.status(200).json({
      message: 'login successful',
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerController, loginController,
};

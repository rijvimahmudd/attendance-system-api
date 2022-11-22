const router = require('express').Router();
const { loginController, registerController } = require('../controller/auth');

router.get('/', (_req, res) => res.json({ message: 'route work successfully' }));

router.post('/register', registerController);

// eslint-disable-next-line consistent-return
router.post('/login', loginController);

module.exports = router;

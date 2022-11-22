const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
router.use('/api/v1/auth', require('./auth'));
router.use('/api/v1/users', authenticate, require('./users'));
router.use('/api/v1/admin/attendance', authenticate, require('./adminAttendance'));
router.use('/api/v1/student/attendance', authenticate, require('./student-attendance'));

router.get('/health', (_req, res) => res.json({ message: "I'm good enough" }));
module.exports = router;

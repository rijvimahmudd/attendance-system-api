const router = require('express').Router();
const {
  getUser, getUserById, postUser, deleteUserById, patchUserById, putUserById,
} = require('../controller/user');

// get user by id or email

router.get('/:userId', getUserById);

// update user by id

router.patch('/:userId', patchUserById);

// update user by id

router.put('/:userId', putUserById);

// delete user by id

router.delete('/:userId', deleteUserById);

/**
 * Get all users
 * @route /api/v1/user?sort=['by','name']
 */
router.get('/', getUser);

// create user
router.post('/', postUser);

module.exports = router;

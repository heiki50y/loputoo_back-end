const express = require('express');
const {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');


router
    .route('/')
    .get(protect, authorize('admin'), getAllUsers)
    .post(protect, authorize('admin'), createUser);

router
    .route('/:id')
    .get(protect, authorize('admin'), getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
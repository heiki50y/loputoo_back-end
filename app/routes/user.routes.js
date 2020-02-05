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
    .get(protect, authorize('teacher'), getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
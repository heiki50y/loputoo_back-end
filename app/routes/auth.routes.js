const express = require('express');

const { register, login, logout, userProfile } = require('../controllers/auth.controller');


const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protect, userProfile);

module.exports = router;


const { registeruser, loginUser, getUserInfo } = require('../controllers/authController.js');
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');

router.post('/register', registeruser);
router.post('/login', loginUser);
router.get('/user',protect, getUserInfo);

module.exports = router; 

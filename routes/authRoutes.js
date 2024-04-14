const express = require('express');
const { register, login } = require('../controllers/authController');
// const authController = require('../controllers/authController');
// register
// logi
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;

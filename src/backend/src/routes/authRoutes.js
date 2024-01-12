const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const authController = require('../controllers/authController');

router.post('/register', tryCatch(authController.register));
router.post('/login', tryCatch(authController.login));
router.get('/me', tryCatch(authController.me));
router.post('/logout', tryCatch(authController.logout));

module.exports = router;
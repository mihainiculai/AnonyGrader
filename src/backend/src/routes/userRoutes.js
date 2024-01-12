const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const userController = require('../controllers/userController');

router.put('/changeName', tryCatch(userController.changeName));


module.exports = router;
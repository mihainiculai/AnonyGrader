const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const userController = require('../controllers/userController');

router.get('/students', tryCatch(userController.getStudents));
router.put('/changeName', tryCatch(userController.changeName));

module.exports = router;
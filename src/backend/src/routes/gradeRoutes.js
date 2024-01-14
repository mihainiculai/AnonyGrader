const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const gradeController = require('../controllers/gradeController');

router.get('/', tryCatch(gradeController.getProjectsToGrade));
router.put('/:id', tryCatch(gradeController.setGrade));

module.exports = router;
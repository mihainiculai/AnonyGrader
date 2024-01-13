const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const projectController = require('../controllers/projectController');

router.get('/:id', tryCatch(projectController.getProject));
router.get('/', tryCatch(projectController.getProjects));
router.post('/', tryCatch(projectController.createProject));
router.put('/:id', tryCatch(projectController.updateProject));
router.delete('/:id', tryCatch(projectController.deleteProject));

module.exports = router;
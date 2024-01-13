const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const teamController = require('../controllers/teamController');

router.get('/:id', tryCatch(teamController.getTeamByProjectId));
router.post('/', tryCatch(teamController.addTeam));
router.put('/:id', tryCatch(teamController.updateTeam));
router.delete('/:id', tryCatch(teamController.deleteTeam));
router.put('/project/:id', tryCatch(teamController.updateProjectDetail));

module.exports = router;
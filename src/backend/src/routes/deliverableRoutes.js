const express = require('express');
const router = express.Router();
const { tryCatch } = require("../utils/tryCatch");
const deliverableController = require('../controllers/deliverableController');

router.get('/:id', tryCatch(deliverableController.getDeliverableByTeamId));
router.post('/', tryCatch(deliverableController.addDeliverable));
router.put('/:id', tryCatch(deliverableController.updateDeliverable));
router.delete('/:id', tryCatch(deliverableController.deleteDeliverable));

module.exports = router;
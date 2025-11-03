const express = require('express');
const router = express.Router();
const InstanceController = require('../controllers/instanceController');
const rateLimiter = require('../middleware/rateLimiter');

// Apply rate limiting to sync endpoint
router.post('/sync', rateLimiter.syncLimiter, InstanceController.syncInstances);

// Other routes
router.get('/', InstanceController.getAllInstances);
router.get('/stats', InstanceController.getStats);
router.get('/:instanceId', InstanceController.getInstanceById);

module.exports = router;

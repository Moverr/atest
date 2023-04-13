'use strict';
const pollingController = require('../controllers/polling.controller')
const aAuth = require('../middleware/aAuth.middleware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/:positionId', aAuth.checkAuth,pollingController.Index)

module.exports = router
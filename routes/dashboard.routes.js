'use strict';
const dashboardController = require('../controllers/dashboard.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const express = require('express')
const router = express.Router()

//ROUTES
router.get('/cards', AdminAuthMiddleware.checkAuth, dashboardController.Index)


module.exports = router
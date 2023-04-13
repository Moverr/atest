'use strict';
const auditController = require('../controllers/audit.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const express = require('express')
const router = express.Router()
//AUDIT ROUTES
router.get('/', AdminAuthMiddleware.checkAuth, auditController.Index)

module.exports = router
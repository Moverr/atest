'use strict';
const adminController = require('../controllers/admin.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/', AdminAuthMiddleware.checkAuth, adminController.Index)
router.get('/:id', AdminAuthMiddleware.checkAuth, adminController.Show)
router.put('/:id', AdminAuthMiddleware.checkAuth, adminController.Edit)
router.delete('/:id', AdminAuthMiddleware.checkAuth, adminController.Edit)

module.exports = router
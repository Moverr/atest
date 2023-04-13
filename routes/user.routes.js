'use strict';
const userController = require('../controllers/user.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const UserAuthMiddleware = require('../middleware/auth.middleware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/users', AdminAuthMiddleware.checkAuth, userController.Index)
router.get('/user/:id', UserAuthMiddleware.checkAuth, userController.Show)
router.put('/user/:id', UserAuthMiddleware.checkAuth, userController.Edit)

module.exports = router
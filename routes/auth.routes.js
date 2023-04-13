'use strict';
const authController = require('../controllers/auth.controller')
const AuthMiddleware = require('../middleware/aAuth.middleware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.post('/register', authController.Register)
router.post('/login', authController.Login)
router.get('/authenticated',AuthMiddleware.checkAuth, authController.Authenticated_user)


module.exports = router
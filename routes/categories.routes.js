'use strict';
const CategoriesController = require('../controllers/category.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/', AdminAuthMiddleware.checkAuth,CategoriesController.Index)
router.get('/:id', AdminAuthMiddleware.checkAuth, CategoriesController.Show)
router.post('/', AdminAuthMiddleware.checkAuth, CategoriesController.Store)
router.put('/:id', AdminAuthMiddleware.checkAuth, CategoriesController.Edit)
router.delete('/:id', AdminAuthMiddleware.checkAuth, CategoriesController.Destroy)

module.exports = router
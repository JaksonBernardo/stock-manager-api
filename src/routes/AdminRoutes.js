import express from 'express'

import AdminController from '../controllers/AdminController.js'

const adminRoutes = express.Router()

adminRoutes.post('/login', AdminController.login)

export default adminRoutes
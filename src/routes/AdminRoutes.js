import express from 'express';

import verifyJwtToken from '../middlewares/authJwt.js';
import authorizeRole from '../middlewares/authPermission.js';

import AdminController from '../controllers/AdminController.js';

const adminRoutes = express.Router();

adminRoutes.post('/login', AdminController.login);
adminRoutes.post('/create-role', verifyJwtToken, authorizeRole(['admin']), AdminController.createRole)

export default adminRoutes;
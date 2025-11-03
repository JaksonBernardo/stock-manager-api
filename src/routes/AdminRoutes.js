import express from 'express';

import verifyJwtToken from '../middlewares/authJwt.js';
import authorizeRole from '../middlewares/authPermission.js';

import AdminController from '../controllers/AdminController.js';

const adminRoutes = express.Router();

adminRoutes.post('/login', AdminController.login);
adminRoutes.post('/create-admin', AdminController.createAdmin);
adminRoutes.post('/create-role', verifyJwtToken, authorizeRole(['admin']), AdminController.createRole);
adminRoutes.post('/create-user', verifyJwtToken, authorizeRole(['admin']), AdminController.createUser);
adminRoutes.post('/relate-role-permission', verifyJwtToken, authorizeRole(['admin']), AdminController.relateRolePermission);

export default adminRoutes;
import express from 'express';
import verifyJwtToken from '../middlewares/authJwt.js';
import AdminController from '../controllers/AdminController.js';

const adminRoutes = express.Router();

adminRoutes.post('/login', AdminController.login);
adminRoutes.get('/my-company', verifyJwtToken, AdminController.getMyCompany);

export default adminRoutes;
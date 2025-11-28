import express from 'express';

import verifyJwtToken from '../middlewares/authJwt.js';
import authorizeRole from '../middlewares/authPermission.js';

import SupplierController from '../controllers/SupplierController.js';

const supplierRoutes = express.Router();

supplierRoutes.post('/create', verifyJwtToken, SupplierController.create);
supplierRoutes.put('/update/:id', verifyJwtToken, SupplierController.update);
supplierRoutes.delete('/delete/:id', verifyJwtToken, SupplierController.delete);
supplierRoutes.get('/search', verifyJwtToken, SupplierController.findByName);
supplierRoutes.get('/:id', verifyJwtToken, SupplierController.findById);

export default supplierRoutes;

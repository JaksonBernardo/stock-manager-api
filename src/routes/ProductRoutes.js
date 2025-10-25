import express from 'express';

import verifyJwtToken from '../middlewares/authJwt.js';
import authorizeRole from '../middlewares/authPermission.js';

import ProductController from '../controllers/ProductController.js';

const productRoutes = express.Router();

productRoutes.get('/get-categorys', verifyJwtToken, ProductController.findAllCategorys);
productRoutes.get('/get-categorys/:id', verifyJwtToken, ProductController.findCategoryById);
productRoutes.post('/create-category', verifyJwtToken, ProductController.createCategory);
productRoutes.put('/update-category/:id', verifyJwtToken, ProductController.updateCategory);
productRoutes.delete('/delete-category/:id', verifyJwtToken, ProductController.deleteCategory);
productRoutes.post('/create-product', verifyJwtToken, ProductController.createProduct);
productRoutes.put('/update-product/:id', verifyJwtToken, ProductController.updateProduct);

export default productRoutes;
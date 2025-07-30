import express from 'express';
import companyRoutes from './routes/CompanyRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';

const app = express();

app.use(express.json());

app.use('/companys', companyRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

export default app;
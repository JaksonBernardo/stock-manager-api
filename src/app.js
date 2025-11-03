import express from 'express';
import cors from 'cors';
import companyRoutes from './routes/CompanyRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/companys', companyRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

export default app;
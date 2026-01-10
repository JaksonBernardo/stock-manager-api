import express from 'express';
import cors from 'cors';
import companyRoutes from './routes/CompanyRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use('/companys', companyRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

export default app;
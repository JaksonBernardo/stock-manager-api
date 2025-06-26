import express from 'express'
import companyRoutes from './routes/CompanyRoutes.js'
import adminRoutes from './routes/AdminRoutes.js'

const app = express()

app.use(express.json())

app.use('/companys', companyRoutes)
app.use('/admin', adminRoutes)

export default app;
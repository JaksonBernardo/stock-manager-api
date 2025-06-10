import express from 'express'
import CompanyRoutes from './routes/CompanyRoutes.js'

const app = express()

app.use(express.json())

app.use('/companys', CompanyRoutes)

export default app;
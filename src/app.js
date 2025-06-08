import express from 'express'
import UserRoute from './routes/UserRoutes.js'

const app = express()

app.use(express.json())

app.use('/companys', UserRoute)

export default app;
import express from 'express'
import CompanyController from '../controllers/CompanyController.js'

const UserRoute = express.Router()

UserRoute.post('/', CompanyController.createCompany)

export default UserRoute;

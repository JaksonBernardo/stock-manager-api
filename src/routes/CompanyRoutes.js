import express from 'express'
import CompanyController from '../controllers/CompanyController.js'

const CompanyRoutes = express.Router()

CompanyRoutes.post('/', CompanyController.createCompany)
CompanyRoutes.put('/:id', CompanyController.updateCompany)

export default CompanyRoutes;

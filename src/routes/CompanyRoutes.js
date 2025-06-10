import express from 'express'
import CompanyController from '../controllers/CompanyController.js'

const CompanyRoutes = express.Router()

CompanyRoutes.get('/', CompanyController.getAllCompanys)
CompanyRoutes.get('/:id', CompanyController.getCompanyId)
CompanyRoutes.post('/', CompanyController.createCompany)
CompanyRoutes.put('/:id', CompanyController.updateCompany)
CompanyRoutes.delete('/:id', CompanyController.deleteCompany)

export default CompanyRoutes;
